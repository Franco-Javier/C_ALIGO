import type { Noticia } from "@/types/database";
import { mockId } from "./ids";
import { shared } from "./store";

// Titulares de ejemplo; las URLs no apuntan a artículos reales.
export const MOCK_NOTICIAS: Noticia[] = shared("MOCK_NOTICIAS", () => [
  { id: mockId.noticia(1), titulo: "Nueva versión de TypeScript mejora el rendimiento del compilador", resumen: "El equipo de TypeScript anunció mejoras en los tiempos de compilación.", url: "https://example.com/noticias/typescript", fuente: "Ejemplo Tech", publicado_en: "2026-10-15T14:00:00Z", creado_en: "2026-10-16T06:00:00Z" },
  { id: mockId.noticia(2), titulo: "Investigadores publican una guía abierta sobre agentes de IA", resumen: "Una guía práctica para construir agentes de forma segura.", url: "https://example.com/noticias/agentes-ia", fuente: "Ejemplo IA", publicado_en: "2026-10-14T10:00:00Z", creado_en: "2026-10-15T06:00:00Z" },
  { id: mockId.noticia(3), titulo: "Vulnerabilidad crítica en un popular router doméstico", resumen: "Se recomienda actualizar el firmware lo antes posible.", url: "https://example.com/noticias/router", fuente: "Ejemplo Seguridad", publicado_en: "2026-10-13T18:00:00Z", creado_en: "2026-10-14T06:00:00Z" },
  { id: mockId.noticia(4), titulo: "Wi-Fi 7 llega a más dispositivos", resumen: "Los fabricantes aceleran la adopción del nuevo estándar.", url: "https://example.com/noticias/wifi7", fuente: "Ejemplo Redes", publicado_en: "2026-10-12T09:00:00Z", creado_en: "2026-10-13T06:00:00Z" },
  { id: mockId.noticia(5), titulo: "Python sigue liderando los rankings de popularidad", resumen: "El lenguaje mantiene el primer lugar por tercer año.", url: "https://example.com/noticias/python", fuente: "Ejemplo Tech", publicado_en: "2026-10-11T12:00:00Z", creado_en: "2026-10-12T06:00:00Z" },
]);
