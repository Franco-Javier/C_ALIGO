import type { MaterialConAutor, TipoMaterial } from "@/types/database";
import { MOCK_MATERIALES, mockMatches, mockPerfilResumen } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { PERFIL_RESUMEN, isMockMode, throwIfError } from "./shared";

type MaterialesFilter = { tema?: string; tipo?: TipoMaterial; q?: string };

// Solo miembros (RLS).
export async function getMateriales(filter: MaterialesFilter = {}): Promise<MaterialConAutor[]> {
  if (isMockMode) {
    return MOCK_MATERIALES.filter(
      (m) =>
        (!filter.tema || m.tema === filter.tema) &&
        (!filter.tipo || m.tipo === filter.tipo) &&
        (!filter.q || mockMatches(m.titulo, filter.q)),
    )
      .sort((a, b) => (b.creado_en ?? "").localeCompare(a.creado_en ?? ""))
      .map((m) => ({ ...m, autor: mockPerfilResumen(m.subido_por) }));
  }

  const supabase = await createClient();
  let query = supabase.from("materiales").select(`*, autor:perfiles(${PERFIL_RESUMEN})`);
  if (filter.tema) query = query.eq("tema", filter.tema);
  if (filter.tipo) query = query.eq("tipo", filter.tipo);
  if (filter.q) query = query.ilike("titulo", `%${filter.q}%`);

  const { data, error } = await query
    .order("creado_en", { ascending: false })
    .overrideTypes<MaterialConAutor[], { merge: false }>();
  throwIfError(error, "getMateriales");
  return data ?? [];
}
