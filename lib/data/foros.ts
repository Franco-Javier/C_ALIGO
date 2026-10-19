import type { Foro, HiloConAutor, MensajeConAutor } from "@/types/database";
import { MOCK_FOROS, MOCK_HILOS, MOCK_MENSAJES, mockPerfilResumen } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { PERFIL_RESUMEN, isMockMode, throwIfError } from "./shared";

// Solo miembros (RLS). Los subforos tienen foro_padre_id.
export async function getForos(): Promise<Foro[]> {
  if (isMockMode) return [...MOCK_FOROS].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

  const supabase = await createClient();
  const { data, error } = await supabase.from("foros").select("*").order("orden");
  throwIfError(error, "getForos");
  return data ?? [];
}

/** Hilos de un foro, fijados primero y luego los más nuevos. */
export async function getHilos(foroId: string): Promise<HiloConAutor[]> {
  if (isMockMode) {
    return MOCK_HILOS.filter((h) => h.foro_id === foroId)
      .sort(
        (a, b) =>
          Number(b.fijado) - Number(a.fijado) ||
          (b.creado_en ?? "").localeCompare(a.creado_en ?? ""),
      )
      .map((h) => ({ ...h, autor: mockPerfilResumen(h.autor_id) }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hilos")
    .select(`*, autor:perfiles(${PERFIL_RESUMEN})`)
    .eq("foro_id", foroId)
    .order("fijado", { ascending: false })
    .order("creado_en", { ascending: false })
    .overrideTypes<HiloConAutor[], { merge: false }>();
  throwIfError(error, "getHilos");
  return data ?? [];
}

/** Mensajes de un hilo en orden cronológico. */
export async function getMensajes(hiloId: string): Promise<MensajeConAutor[]> {
  if (isMockMode) {
    return MOCK_MENSAJES.filter((m) => m.hilo_id === hiloId)
      .sort((a, b) => (a.creado_en ?? "").localeCompare(b.creado_en ?? ""))
      .map((m) => ({ ...m, autor: mockPerfilResumen(m.autor_id) }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mensajes")
    .select(`*, autor:perfiles(${PERFIL_RESUMEN})`)
    .eq("hilo_id", hiloId)
    .order("creado_en")
    .overrideTypes<MensajeConAutor[], { merge: false }>();
  throwIfError(error, "getMensajes");
  return data ?? [];
}

export async function getForoById(id: string): Promise<Foro | null> {
  if (isMockMode) return MOCK_FOROS.find((f) => f.id === id) ?? null;

  const supabase = await createClient();
  const { data, error } = await supabase.from("foros").select("*").eq("id", id).maybeSingle();
  throwIfError(error, "getForoById");
  return data;
}

export async function getHiloById(id: string): Promise<HiloConAutor | null> {
  if (isMockMode) {
    const hilo = MOCK_HILOS.find((h) => h.id === id);
    return hilo ? { ...hilo, autor: mockPerfilResumen(hilo.autor_id) } : null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hilos")
    .select(`*, autor:perfiles(${PERFIL_RESUMEN})`)
    .eq("id", id)
    .overrideTypes<HiloConAutor[], { merge: false }>();
  throwIfError(error, "getHiloById");
  return data?.[0] ?? null;
}

/** Todos los hilos (panel admin, para fijarlos), fijados primero. */
export async function getHilosAdmin(): Promise<HiloConAutor[]> {
  if (isMockMode) {
    return [...MOCK_HILOS]
      .sort(
        (a, b) =>
          Number(b.fijado) - Number(a.fijado) ||
          (b.creado_en ?? "").localeCompare(a.creado_en ?? ""),
      )
      .map((h) => ({ ...h, autor: mockPerfilResumen(h.autor_id) }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hilos")
    .select(`*, autor:perfiles(${PERFIL_RESUMEN})`)
    .order("fijado", { ascending: false })
    .order("creado_en", { ascending: false })
    .overrideTypes<HiloConAutor[], { merge: false }>();
  throwIfError(error, "getHilosAdmin");
  return data ?? [];
}
