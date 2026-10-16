import type {
  Evento,
  EventoConAsistentes,
  PerfilResumen,
  TipoEvento,
} from "@/types/database";
import { MOCK_EVENTO_ASISTENTES, MOCK_EVENTOS, mockPerfilResumen } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { PERFIL_RESUMEN, isMockMode, throwIfError } from "./shared";

type EventosFilter = {
  tipo?: TipoEvento;
  /** Requiere la hora actual: la página que lo use debe ser dinámica (connection()). */
  cuando?: "proximos" | "pasados";
  limit?: number;
};

// Nota: RLS solo deja ver evento_asistentes a miembros; para visitantes el conteo es 0.
export async function getEventos(filter: EventosFilter = {}): Promise<EventoConAsistentes[]> {
  const now = filter.cuando ? new Date().toISOString() : null;
  const ascending = filter.cuando !== "pasados";

  if (isMockMode) {
    const items = MOCK_EVENTOS.filter(
      (e) =>
        (!filter.tipo || e.tipo === filter.tipo) &&
        (!now || (filter.cuando === "proximos" ? e.fecha_inicio >= now : e.fecha_inicio < now)),
    )
      .sort((a, b) =>
        ascending
          ? a.fecha_inicio.localeCompare(b.fecha_inicio)
          : b.fecha_inicio.localeCompare(a.fecha_inicio),
      )
      .map((e) => ({
        ...e,
        asistentes_count: MOCK_EVENTO_ASISTENTES.filter((a) => a.evento_id === e.id).length,
      }));
    return filter.limit ? items.slice(0, filter.limit) : items;
  }

  const supabase = await createClient();
  let query = supabase.from("eventos").select("*, evento_asistentes(count)");
  if (filter.tipo) query = query.eq("tipo", filter.tipo);
  if (now) {
    query =
      filter.cuando === "proximos"
        ? query.gte("fecha_inicio", now)
        : query.lt("fecha_inicio", now);
  }
  query = query.order("fecha_inicio", { ascending });
  if (filter.limit) query = query.limit(filter.limit);

  const { data, error } = await query;
  throwIfError(error, "getEventos");
  return (data ?? []).map(({ evento_asistentes, ...evento }) => ({
    ...evento,
    asistentes_count: evento_asistentes[0]?.count ?? 0,
  }));
}

export type EventoDetalle = Evento & { asistentes: PerfilResumen[] };

export async function getEventoById(id: string): Promise<EventoDetalle | null> {
  if (isMockMode) {
    const evento = MOCK_EVENTOS.find((e) => e.id === id);
    if (!evento) return null;
    const asistentes = MOCK_EVENTO_ASISTENTES.filter((a) => a.evento_id === id)
      .map((a) => mockPerfilResumen(a.perfil_id))
      .filter((p): p is PerfilResumen => p !== null);
    return { ...evento, asistentes };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("eventos")
    .select(`*, evento_asistentes(perfil:perfiles(${PERFIL_RESUMEN}))`)
    .eq("id", id)
    .overrideTypes<
      (Evento & { evento_asistentes: { perfil: PerfilResumen | null }[] })[],
      { merge: false }
    >();
  throwIfError(error, "getEventoById");

  const row = data?.[0];
  if (!row) return null;
  const { evento_asistentes, ...evento } = row;
  return {
    ...evento,
    asistentes: evento_asistentes
      .map((a) => a.perfil)
      .filter((p): p is PerfilResumen => p !== null),
  };
}
