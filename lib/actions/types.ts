/** Resultado de toda Server Action (CLAUDE.md §8). `data` solo si la acción devuelve algo (ej. un id). */
export type ActionResult<T = void> =
  | ([T] extends [void] ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };
