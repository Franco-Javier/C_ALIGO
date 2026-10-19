import type { EstadoUsuario, Perfil } from "@/types/database";
import { MOCK_EVENTOS, MOCK_PERFILES, MOCK_PROYECTOS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

export type ResumenAdmin = {
  porEstado: Record<EstadoUsuario, number>;
  proyectos: number;
  eventosMes: number;
  ultimosRegistros: Perfil[];
};

/** Inicio y fin del mes actual en hora de Panamá (UTC-5). Requiere connection() en la página. */
function rangoMesActual() {
  const now = new Date(Date.now() - 5 * 3600_000);
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const iso = (month: number) => new Date(Date.UTC(y, month, 1, 5)).toISOString();
  return { desde: iso(m), hasta: iso(m + 1) };
}

export async function getResumenAdmin(): Promise<ResumenAdmin> {
  const { desde, hasta } = rangoMesActual();

  if (isMockMode) {
    const contar = (estado: EstadoUsuario) => MOCK_PERFILES.filter((p) => p.estado === estado).length;
    return {
      porEstado: { activo: contar("activo"), pendiente: contar("pendiente"), inactivo: contar("inactivo") },
      proyectos: MOCK_PROYECTOS.length,
      eventosMes: MOCK_EVENTOS.filter((e) => e.fecha_inicio >= desde && e.fecha_inicio < hasta).length,
      ultimosRegistros: [...MOCK_PERFILES]
        .sort((a, b) => (b.creado_en ?? "").localeCompare(a.creado_en ?? ""))
        .slice(0, 5),
    };
  }

  const supabase = await createClient();
  const head = { count: "exact", head: true } as const;
  const porEstado = (estado: EstadoUsuario) =>
    supabase.from("perfiles").select("*", head).eq("estado", estado);
  const [activo, pendiente, inactivo, proyectos, eventosMes, ultimos] = await Promise.all([
    porEstado("activo"),
    porEstado("pendiente"),
    porEstado("inactivo"),
    supabase.from("proyectos").select("*", head),
    supabase.from("eventos").select("*", head).gte("fecha_inicio", desde).lt("fecha_inicio", hasta),
    supabase.from("perfiles").select("*").order("creado_en", { ascending: false }).limit(5),
  ]);
  throwIfError(
    activo.error ?? pendiente.error ?? inactivo.error ?? proyectos.error ?? eventosMes.error ?? ultimos.error,
    "getResumenAdmin",
  );

  return {
    porEstado: { activo: activo.count ?? 0, pendiente: pendiente.count ?? 0, inactivo: inactivo.count ?? 0 },
    proyectos: proyectos.count ?? 0,
    eventosMes: eventosMes.count ?? 0,
    ultimosRegistros: ultimos.data ?? [],
  };
}

/** Todos los perfiles, incluidos los pendientes (solo para el admin). */
export async function getPerfilesAdmin(): Promise<Perfil[]> {
  if (isMockMode) return [...MOCK_PERFILES].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

  const supabase = await createClient();
  const { data, error } = await supabase.from("perfiles").select("*").order("nombre");
  throwIfError(error, "getPerfilesAdmin");
  return data ?? [];
}
