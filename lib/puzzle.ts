// Reto de ingreso (§7.3). La pregunta es pública; la respuesta vive solo en el
// servidor (PUZZLE_RESPUESTA) y nunca llega al navegador.

export const PUZZLE = {
  pregunta: "¿Qué imprime este código?",
  codigo: "for (i = 0; i < 3; i++) print(i*2)",
  ayuda: "Escribe los valores en orden, por ejemplo: 1 2 3",
} as const;

/** "0, 2, 4", "[0 2 4]" y "024" cuentan igual: sin espacios, comas, corchetes ni comillas. */
export function normalizeRespuesta(value: string) {
  return value.toLowerCase().replace(/[\s,;[\]()"'`]/g, "");
}
