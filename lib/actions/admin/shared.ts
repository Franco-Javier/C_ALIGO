import "server-only";
import { revalidatePath } from "next/cache";
import type { Perfil } from "@/types/database";
import { getDirectivaOrError } from "@/lib/auth/guards";
import { formError } from "@/lib/forms";
import type { ActionResult } from "../types";

// Utilidades de las Server Actions del panel admin. Las acciones están en los
// demás archivos de esta carpeta; este no lleva "use server" porque no expone nada.

/**
 * Envuelve una acción de directiva: verifica el rol, convierte los FormError
 * en { ok: false } y revalida todo el sitio si salió bien (el admin afecta a muchas páginas).
 */
export async function directivaAction(
  run: (user: Perfil) => Promise<ActionResult>,
): Promise<ActionResult> {
  const { user, error } = await getDirectivaOrError();
  if (!user) return { ok: false, error };
  let result: ActionResult;
  try {
    result = await run(user);
  } catch (e) {
    return formError(e);
  }
  if (result.ok) revalidatePath("/", "layout");
  return result;
}

/** Fase 0/1: crea (id null) o actualiza una fila de un array mock. */
export function mockSave<T extends { id: string }>(rows: T[], id: string | null, values: Omit<T, "id">) {
  if (id) {
    const row = rows.find((r) => r.id === id);
    if (!row) return false;
    Object.assign(row, values);
    return true;
  }
  rows.push({ ...values, id: crypto.randomUUID() } as T);
  return true;
}

/** Fase 0/1: borra en sitio las filas que cumplan la condición. */
export function mockRemoveWhere<T>(rows: T[], predicate: (row: T) => boolean) {
  for (let i = rows.length - 1; i >= 0; i--) if (predicate(rows[i]!)) rows.splice(i, 1);
}

export const NOT_FOUND: ActionResult = { ok: false, error: "El registro no existe" };
export const dbError = (accion: string): ActionResult => ({ ok: false, error: `No se pudo ${accion}` });
