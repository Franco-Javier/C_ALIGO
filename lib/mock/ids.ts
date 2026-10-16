// IDs fijos para que las relaciones entre mocks sean estables.
const id = (prefix: string, n: number) =>
  `${prefix}-0000-4000-8000-${String(n).padStart(12, "0")}`;

export const P = {
  francisco: id("00000000", 1),
  maria: id("00000000", 2),
  isacar: id("00000000", 3),
  ana: id("00000000", 4),
  jose: id("00000000", 5),
  laura: id("00000000", 6),
  nuevo: id("00000000", 7),
} as const;

export const mockId = {
  proyecto: (n: number) => id("10000000", n),
  evento: (n: number) => id("20000000", n),
  evidencia: (n: number) => id("30000000", n),
  foro: (n: number) => id("40000000", n),
  hilo: (n: number) => id("50000000", n),
  mensaje: (n: number) => id("60000000", n),
  material: (n: number) => id("70000000", n),
  herramienta: (n: number) => id("80000000", n),
  noticia: (n: number) => id("90000000", n),
  badge: (n: number) => id("a0000000", n),
};
