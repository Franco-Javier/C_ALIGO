import type { PerfilResumen } from "@/types/database";
import { MOCK_PERFILES } from "./perfiles";

export * from "./perfiles";
export * from "./eventos";
export * from "./proyectos";
export * from "./evidencias";
export * from "./foros";
export * from "./materiales";
export * from "./herramientas";
export * from "./noticias";
export * from "./badges";

/** Emula el join `perfiles(id, nombre, usuario_github, avatar_url, rol)`. */
export function mockPerfilResumen(id: string | null): PerfilResumen | null {
  const perfil = MOCK_PERFILES.find((p) => p.id === id);
  if (!perfil) return null;
  const { nombre, usuario_github, avatar_url, rol } = perfil;
  return { id: perfil.id, nombre, usuario_github, avatar_url, rol };
}

/** Emula `ilike '%q%'` ignorando mayúsculas y tildes. */
export function mockMatches(value: string | null, query: string) {
  const normalize = (s: string) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  return normalize(value ?? "").includes(normalize(query));
}
