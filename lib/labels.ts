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

/** Valida un ?tipo= de la URL contra los tipos filtrables. */
export function parseTipoEvento(value: unknown): TipoEvento | undefined {
  return TIPOS_EVENTO_FILTRO.find((tipo) => tipo === value);
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
