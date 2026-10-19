// Los Route Handlers y las páginas se empaquetan por separado y cada bundle tendría
// su propia copia de los arrays mock. Guardarlos en globalThis hace que todas las
// mutaciones (puzzle, formularios del admin, etc.) se vean en todo el proceso.
// Solo aplica a la Fase 0/1: con Supabase estos datos no se usan.

const store = ((globalThis as { __caligoMock?: Map<string, unknown> }).__caligoMock ??= new Map());

export function shared<T>(key: string, init: () => T): T {
  if (!store.has(key)) store.set(key, init());
  return store.get(key) as T;
}
