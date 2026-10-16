import type { Evidencia, TipoEvento } from "@/types/database";
import { MOCK_EVENTOS, MOCK_EVIDENCIAS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

type EvidenciasFilter = {
  eventoId?: string;
  proyectoId?: string;
  /** Tipo del evento vinculado; excluye las evidencias sin evento. */
  tipoEvento?: TipoEvento;
  limit?: number;
};

/** Evidencias más recientes primero (por `fecha`). */
export async function getEvidencias(filter: EvidenciasFilter = {}): Promise<Evidencia[]> {
  if (isMockMode) {
    const tipoDe = (eventoId: string | null) => MOCK_EVENTOS.find((e) => e.id === eventoId)?.tipo;
    const items = MOCK_EVIDENCIAS.filter(
      (e) =>
        (!filter.eventoId || e.evento_id === filter.eventoId) &&
        (!filter.proyectoId || e.proyecto_id === filter.proyectoId) &&
        (!filter.tipoEvento || tipoDe(e.evento_id) === filter.tipoEvento),
    ).sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
    return filter.limit ? items.slice(0, filter.limit) : items;
  }

  const supabase = await createClient();
  // El join !inner solo se usa al filtrar por tipo, para no perder las evidencias sin evento.
  // `eventos!inner()` sin columnas filtra pero no agrega campos a la respuesta.
  let query = filter.tipoEvento
    ? supabase.from("evidencias").select("*, eventos!inner()").eq("eventos.tipo", filter.tipoEvento)
    : supabase.from("evidencias").select("*");
  if (filter.eventoId) query = query.eq("evento_id", filter.eventoId);
  if (filter.proyectoId) query = query.eq("proyecto_id", filter.proyectoId);
  query = query.order("fecha", { ascending: false });
  if (filter.limit) query = query.limit(filter.limit);

  const { data, error } = await query.overrideTypes<Evidencia[], { merge: false }>();
  throwIfError(error, "getEvidencias");
  return data ?? [];
}
