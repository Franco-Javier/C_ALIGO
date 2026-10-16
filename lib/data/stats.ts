import { MOCK_EVENTOS, MOCK_PERFILES, MOCK_PROYECTOS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

export type Contadores = { miembros: number; proyectos: number; eventos: number };

/** Contadores del inicio. Miembros = perfiles que ya no están pendientes. */
export async function getContadores(): Promise<Contadores> {
  if (isMockMode) {
    return {
      miembros: MOCK_PERFILES.filter((p) => p.estado !== "pendiente").length,
      proyectos: MOCK_PROYECTOS.length,
      eventos: MOCK_EVENTOS.length,
    };
  }

  const supabase = await createClient();
  const head = { count: "exact", head: true } as const;
  const [miembros, proyectos, eventos] = await Promise.all([
    supabase.from("perfiles").select("*", head).neq("estado", "pendiente"),
    supabase.from("proyectos").select("*", head),
    supabase.from("eventos").select("*", head),
  ]);
  throwIfError(miembros.error ?? proyectos.error ?? eventos.error, "getContadores");

  return {
    miembros: miembros.count ?? 0,
    proyectos: proyectos.count ?? 0,
    eventos: eventos.count ?? 0,
  };
}
