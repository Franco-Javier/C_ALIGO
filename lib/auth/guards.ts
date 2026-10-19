import "server-only";
import { forbidden, redirect } from "next/navigation";
import type { Perfil } from "@/types/database";
import { getCurrentUser } from "@/lib/data/session";
import { isDirectiva, isMiembro } from "@/lib/labels";

// Redirecciones de la tabla de acceso (§5), hechas en el servidor al renderizar.
// El proxy de la Fase 2 hará lo mismo antes de renderizar; la seguridad real es RLS.
// Todas leen la sesión: llamarlas dentro de <Suspense>.

/** /foros, /materiales, /perfil/editar: visitante → /login, pendiente → /puzzle. */
export async function requireMiembro(): Promise<Perfil> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isMiembro(user.estado)) redirect("/puzzle");
  return user;
}

/** /admin/*: además de ser miembro, rol de directiva; si no, 403. */
export async function requireDirectiva(): Promise<Perfil> {
  const user = await requireMiembro();
  if (!isDirectiva(user.rol)) forbidden();
  return user;
}

/** /puzzle: solo pendientes. Visitante → /login, miembro → /. */
export async function requirePendiente(): Promise<Perfil> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (isMiembro(user.estado)) redirect("/");
  return user;
}

/** /login: solo visitantes. Pendiente → /puzzle, miembro → /. */
export async function requireVisitante(): Promise<void> {
  const user = await getCurrentUser();
  if (user) redirect(isMiembro(user.estado) ? "/" : "/puzzle");
}

/** Para Server Actions: mismo criterio que requireMiembro, pero devuelve un error. */
export async function getMiembroOrError(): Promise<
  { user: Perfil; error?: never } | { user?: never; error: string }
> {
  const user = await getCurrentUser();
  if (!user) return { error: "Inicia sesión para continuar" };
  if (!isMiembro(user.estado)) return { error: "Primero resuelve el reto de ingreso" };
  return { user };
}

/** Para Server Actions del panel admin. */
export async function getDirectivaOrError() {
  const result = await getMiembroOrError();
  if (result.user && !isDirectiva(result.user.rol)) {
    return { error: "Solo la directiva puede hacer esto" } as const;
  }
  return result;
}
