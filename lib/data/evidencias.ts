import type { Evidencia } from "@/types/database";
import { MOCK_EVIDENCIAS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

type EvidenciasFilter = { eventoId?: string; proyectoId?: string; limit?: number };

/** Evidencias más recientes primero (por `fecha`). */
export async function getEvidencias(filter: EvidenciasFilter = {}): Promise<Evidencia[]> {
  if (isMockMode) {
    const items = MOCK_EVIDENCIAS.filter(
      (e) =>
        (!filter.eventoId || e.evento_id === filter.eventoId) &&
        (!filter.proyectoId || e.proyecto_id === filter.proyectoId),
    ).sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
    return filter.limit ? items.slice(0, filter.limit) : items;
  }

  const supabase = await createClient();
  let query = supabase.from("evidencias").select("*");
  if (filter.eventoId) query = query.eq("evento_id", filter.eventoId);
  if (filter.proyectoId) query = query.eq("proyecto_id", filter.proyectoId);
  query = query.order("fecha", { ascending: false });
  if (filter.limit) query = query.limit(filter.limit);

  const { data, error } = await query;
  throwIfError(error, "getEvidencias");
  return data ?? [];
}
