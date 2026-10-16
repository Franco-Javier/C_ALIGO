import type { PostgrestError } from "@supabase/supabase-js";

export { isMockMode } from "@/lib/supabase/env";

/** Columnas del perfil que se embeben en otras consultas. */
export const PERFIL_RESUMEN = "id, nombre, usuario_github, avatar_url, rol";

/** Lanza un error legible si la consulta falló; lo captura el error.tsx de la ruta. */
export function throwIfError(error: PostgrestError | null, context: string) {
  if (error) throw new Error(`[${context}] ${error.message}`);
}
