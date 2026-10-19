import { MOCK_EVENTOS, MOCK_PERFILES, MOCK_PROYECTOS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

export type Contadores = { miembros: number; proyectos: number; eventos: number };

/**
 * Contadores del inicio. Miembros = perfiles que ya no están pendientes.
 * Las reuniones solo cuentan si quien mira es miembro.
 */
export async function getContadores(
  { incluirReuniones = false }: { incluirReuniones?: boolean } = {},
): Promise<Contadores> {
  if (isMockMode) {
    return {
      miembros: MOCK_PERFILES.filter((p) => p.estado !== "pendiente").length,
      proyectos: MOCK_PROYECTOS.length,
      eventos: MOCK_EVENTOS.filter((e) => incluirReuniones || e.tipo !== "reunion").length,
    };
  }

  const supabase = await createClient();
  const head = { count: "exact", head: true } as const;
  const eventosQuery = supabase.from("eventos").select("*", head);
  const [miembros, proyectos, eventos] = await Promise.all([
    supabase.from("perfiles").select("*", head).neq("estado", "pendiente"),
    supabase.from("proyectos").select("*", head),
    incluirReuniones ? eventosQuery : eventosQuery.neq("tipo", "reunion"),
  ]);
  throwIfError(miembros.error ?? proyectos.error ?? eventos.error, "getContadores");

  return {
    miembros: miembros.count ?? 0,
    proyectos: proyectos.count ?? 0,
    eventos: eventos.count ?? 0,
  };
}
