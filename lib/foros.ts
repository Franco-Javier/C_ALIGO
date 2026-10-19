import type { Foro } from "@/types/database";

/** Agrupa los subforos (foro_padre_id) bajo su foro general, en el orden recibido. */
export function foroTree(foros: Foro[]) {
  return foros
    .filter((f) => !f.foro_padre_id)
    .map((foro) => ({ foro, subforos: foros.filter((s) => s.foro_padre_id === foro.id) }));
}
