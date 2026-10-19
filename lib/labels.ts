import type {
  AreaCarrera,
  EstadoProyecto,
  EstadoUsuario,
  RolUsuario,
  TipoEvento,
  TipoMaterial,
} from "@/types/database";

export const ROL_LABEL: Record<RolUsuario, string> = {
  presidente: "Presidente",
  vicepresidente: "Vicepresidente",
  coordinador: "Coordinador",
  miembro: "Miembro",
};

export const ESTADO_USUARIO_LABEL: Record<EstadoUsuario, string> = {
  pendiente: "Pendiente",
  activo: "Activo",
  inactivo: "Inactivo",
};

export const AREA_LABEL: Record<AreaCarrera, string> = {
  programacion: "Programación",
  ciberseguridad: "Ciberseguridad",
  redes: "Redes",
};

export const ESTADO_PROYECTO_LABEL: Record<EstadoProyecto, string> = {
  idea: "Idea",
  en_progreso: "En progreso",
  pausado: "Pausado",
  terminado: "Terminado",
};

export const TIPO_EVENTO_LABEL: Record<TipoEvento, string> = {
  workshop: "Workshop",
  charla: "Charla",
  hackathon: "Hackathon",
  gira: "Gira",
  stand: "Stand",
  reunion: "Reunión",
};

/** Tipos que aparecen en los filtros públicos (las reuniones son internas). */
export const TIPOS_EVENTO_FILTRO: TipoEvento[] = ["workshop", "charla", "hackathon", "gira", "stand"];

/** Filtros de eventos: los miembros ven además el chip "Reunión". */
export function tiposEventoFiltro(conReuniones: boolean): TipoEvento[] {
  return conReuniones ? [...TIPOS_EVENTO_FILTRO, "reunion"] : TIPOS_EVENTO_FILTRO;
}

/** Valida un ?tipo= de la URL contra los tipos filtrables. */
export function parseTipoEvento(value: unknown, conReuniones = false): TipoEvento | undefined {
  return tiposEventoFiltro(conReuniones).find((tipo) => tipo === value);
}

/** Valida un valor de la URL contra las claves de un diccionario de etiquetas. */
export function parseEnum<T extends string>(labels: Record<T, string>, value: unknown): T | undefined {
  return (Object.keys(labels) as T[]).find((key) => key === value);
}

export const TIPO_MATERIAL_LABEL: Record<TipoMaterial, string> = {
  link: "Link",
  documento: "Documento",
  video: "Video",
  curso: "Curso",
};

const ROLES_DIRECTIVA: RolUsuario[] = ["presidente", "vicepresidente", "coordinador"];

export function isDirectiva(rol: RolUsuario | null | undefined) {
  return !!rol && ROLES_DIRECTIVA.includes(rol);
}

/** Miembro que ya pasó el puzzle (activo o inactivo). */
export function isMiembro(estado: EstadoUsuario | null | undefined) {
  return estado === "activo" || estado === "inactivo";
}

/** Tipo de visitante según la tabla de acceso (§5). */
export type Viewer = "visitante" | "pendiente" | "miembro";

export function viewerOf(perfil: { estado: EstadoUsuario } | null): Viewer {
  if (!perfil) return "visitante";
  return isMiembro(perfil.estado) ? "miembro" : "pendiente";
}

/** Las reuniones son internas: solo las ven los miembros. */
export function puedeVerReuniones(viewer: Viewer) {
  return viewer === "miembro";
}
