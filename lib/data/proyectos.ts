import type { EstadoProyecto, Proyecto, ProyectoConEquipo } from "@/types/database";
import { MOCK_PROYECTO_MIEMBROS, MOCK_PROYECTOS, mockPerfilResumen } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { PERFIL_RESUMEN, isMockMode, throwIfError } from "./shared";

const SELECT_CON_EQUIPO = `*,
  responsable:perfiles!proyectos_responsable_id_fkey(${PERFIL_RESUMEN}),
  miembros:proyecto_miembros(*, perfil:perfiles(${PERFIL_RESUMEN}))`;

function withMockEquipo(proyecto: Proyecto): ProyectoConEquipo {
  return {
    ...proyecto,
    responsable: mockPerfilResumen(proyecto.responsable_id),
    miembros: MOCK_PROYECTO_MIEMBROS.filter((m) => m.proyecto_id === proyecto.id).flatMap(
      (m) => {
        const perfil = mockPerfilResumen(m.perfil_id);
        return perfil ? [{ ...m, perfil }] : [];
      },
    ),
  };
}

export async function getProyectos(
  filter: { estado?: EstadoProyecto; limit?: number } = {},
): Promise<ProyectoConEquipo[]> {
  if (isMockMode) {
    const items = MOCK_PROYECTOS.filter((p) => !filter.estado || p.estado === filter.estado)
      .sort((a, b) => (b.creado_en ?? "").localeCompare(a.creado_en ?? ""))
      .map(withMockEquipo);
    return filter.limit ? items.slice(0, filter.limit) : items;
  }

  const supabase = await createClient();
  let query = supabase.from("proyectos").select(SELECT_CON_EQUIPO);
  if (filter.estado) query = query.eq("estado", filter.estado);
  query = query.order("creado_en", { ascending: false });
  if (filter.limit) query = query.limit(filter.limit);

  const { data, error } = await query.overrideTypes<ProyectoConEquipo[], { merge: false }>();
  throwIfError(error, "getProyectos");
  return data ?? [];
}

export async function getProyectoById(id: string): Promise<ProyectoConEquipo | null> {
  if (isMockMode) {
    const proyecto = MOCK_PROYECTOS.find((p) => p.id === id);
    return proyecto ? withMockEquipo(proyecto) : null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proyectos")
    .select(SELECT_CON_EQUIPO)
    .eq("id", id)
    .overrideTypes<ProyectoConEquipo[], { merge: false }>();
  throwIfError(error, "getProyectoById");
  return data?.[0] ?? null;
}

/** Proyectos donde participa un perfil (para /perfil/[usuario]). */
export async function getProyectosDePerfil(perfilId: string): Promise<Proyecto[]> {
  if (isMockMode) {
    const ids = MOCK_PROYECTO_MIEMBROS.filter((m) => m.perfil_id === perfilId).map(
      (m) => m.proyecto_id,
    );
    return MOCK_PROYECTOS.filter((p) => ids.includes(p.id));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proyecto_miembros")
    .select("proyecto:proyectos(*)")
    .eq("perfil_id", perfilId)
    .overrideTypes<{ proyecto: Proyecto | null }[], { merge: false }>();
  throwIfError(error, "getProyectosDePerfil");
  return (data ?? []).flatMap((row) => (row.proyecto ? [row.proyecto] : []));
}
