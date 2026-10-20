import type { EstadoUsuario, RolUsuario } from "@/types/database";
import { isMiembro } from "@/lib/labels";

// Tabla de acceso del §5 como función pura: la usa proxy.ts antes de renderizar.
// Los guards de lib/auth/guards.ts repiten la regla en cada página (defensa extra);
// la seguridad real sigue siendo RLS.

type Viewer = { estado: EstadoUsuario; rol: RolUsuario } | null;

type Rule = "login" | "puzzle" | "miembros";

const startsWith = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`);

function ruleFor(pathname: string): Rule | null {
  if (startsWith(pathname, "/login")) return "login";
  if (startsWith(pathname, "/puzzle")) return "puzzle";
  // /admin entra aquí: el 403 para miembros sin rol de directiva lo da la página (forbidden()).
  if (["/foros", "/materiales", "/perfil/editar", "/admin"].some((base) => startsWith(pathname, base))) {
    return "miembros";
  }
  return null;
}

/** ¿Hay que leer el perfil para decidir esta ruta? (evita una consulta en rutas públicas) */
export function needsViewer(pathname: string) {
  return ruleFor(pathname) !== null;
}

/** Ruta a la que hay que redirigir, o null si puede pasar. */
export function redirectFor(pathname: string, viewer: Viewer): string | null {
  const miembro = viewer !== null && isMiembro(viewer.estado);

  switch (ruleFor(pathname)) {
    case "login":
      return viewer ? (miembro ? "/" : "/puzzle") : null;
    case "puzzle":
      return !viewer ? "/login" : miembro ? "/" : null;
    case "miembros":
      return !viewer ? "/login" : miembro ? null : "/puzzle";
    default:
      return null;
  }
}
