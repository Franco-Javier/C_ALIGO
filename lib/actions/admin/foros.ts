"use server";

import type { TablesInsert } from "@/types/database";
import { FormError, readOptionalId, readText } from "@/lib/forms";
import { MOCK_FOROS, MOCK_HILOS, MOCK_MENSAJES } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { NOT_FOUND, dbError, directivaAction, mockRemoveWhere, mockSave } from "./shared";

function readForo(form: FormData) {
  const orden = Number(form.get("orden") ?? 0);
  if (!Number.isInteger(orden) || orden < 0 || orden > 999) throw new FormError("El orden debe ser un número entre 0 y 999");
  return {
    nombre: readText(form, "nombre", { label: "El nombre", required: true, max: 60 }),
    descripcion: readText(form, "descripcion", { label: "La descripción", max: 200 }),
    foro_padre_id: readOptionalId(form, "foro_padre_id", { label: "El foro padre" }),
    orden,
  } satisfies TablesInsert<"foros">;
}

/** Foros de un solo nivel de profundidad: general → subforo. */
async function validarPadre(id: string | null, padreId: string | null) {
  if (!padreId) return;
  if (padreId === id) throw new FormError("Un foro no puede ser su propio padre");

  let padreEsSubforo: boolean, tieneSubforos: boolean;
  if (isMockMode) {
    padreEsSubforo = !!MOCK_FOROS.find((f) => f.id === padreId)?.foro_padre_id;
    tieneSubforos = !!id && MOCK_FOROS.some((f) => f.foro_padre_id === id);
  } else {
    const supabase = await createClient();
    const [padre, hijos] = await Promise.all([
      supabase.from("foros").select("foro_padre_id").eq("id", padreId).maybeSingle(),
      id ? supabase.from("foros").select("id", { count: "exact", head: true }).eq("foro_padre_id", id) : null,
    ]);
    padreEsSubforo = !!padre.data?.foro_padre_id;
    tieneSubforos = (hijos?.count ?? 0) > 0;
  }
  if (padreEsSubforo) throw new FormError("Un subforo no puede tener subforos");
  if (tieneSubforos) throw new FormError("Este foro tiene subforos: no puede volverse subforo");
}

export async function saveForo(id: string | null, form: FormData) {
  return directivaAction(async () => {
    const foro = readForo(form);
    await validarPadre(id, foro.foro_padre_id);

    if (isMockMode) {
      const original = id ? MOCK_FOROS.find((f) => f.id === id) : undefined;
      const ok = mockSave(MOCK_FOROS, id, { ...foro, creado_en: original?.creado_en ?? new Date().toISOString() });
      return ok ? { ok: true } : NOT_FOUND;
    }

    const supabase = await createClient();
    const { error } = id
      ? await supabase.from("foros").update(foro).eq("id", id)
      : await supabase.from("foros").insert(foro);
    return error ? dbError("guardar el foro") : { ok: true };
  });
}

/** Borra el foro con sus subforos, hilos y mensajes (cascada en la BD). */
export async function deleteForo(id: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      const foroIds = new Set([id, ...MOCK_FOROS.filter((f) => f.foro_padre_id === id).map((f) => f.id)]);
      const hiloIds = new Set(MOCK_HILOS.filter((h) => h.foro_id && foroIds.has(h.foro_id)).map((h) => h.id));
      mockRemoveWhere(MOCK_MENSAJES, (m) => !!m.hilo_id && hiloIds.has(m.hilo_id));
      mockRemoveWhere(MOCK_HILOS, (h) => hiloIds.has(h.id));
      mockRemoveWhere(MOCK_FOROS, (f) => foroIds.has(f.id));
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("foros").delete().eq("id", id);
    return error ? dbError("eliminar el foro") : { ok: true };
  });
}

/** Fija o desfija un hilo (los fijados salen primero en su foro). */
export async function setHiloFijado(hiloId: string, fijado: boolean) {
  return directivaAction(async () => {
    if (isMockMode) {
      const hilo = MOCK_HILOS.find((h) => h.id === hiloId);
      if (!hilo) return NOT_FOUND;
      hilo.fijado = fijado;
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("hilos").update({ fijado }).eq("id", hiloId);
    return error ? dbError("actualizar el hilo") : { ok: true };
  });
}
