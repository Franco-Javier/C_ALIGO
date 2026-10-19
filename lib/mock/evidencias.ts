import type { Evidencia } from "@/types/database";
import { P, mockId } from "./ids";
import { shared } from "./store";

export const MOCK_EVIDENCIAS: Evidencia[] = shared("MOCK_EVIDENCIAS", () => [
  {
    id: mockId.evidencia(1),
    titulo: "Gira al centro de datos",
    descripcion: "Conocimos racks, enfriamiento y redundancia eléctrica de primera mano.",
    fotos: ["/mock/evidencia-1.svg", "/mock/evidencia-2.svg"],
    evento_id: mockId.evento(4),
    proyecto_id: null,
    publicado_por: P.francisco,
    fecha: "2026-09-18",
    creado_en: "2026-09-19T12:00:00Z",
  },
  {
    id: mockId.evidencia(2),
    titulo: "Stand en la Feria de Ingeniería",
    descripcion: "Más de 80 estudiantes pasaron por el stand a conocer la comunidad.",
    fotos: ["/mock/evidencia-2.svg", "/mock/evidencia-3.svg"],
    evento_id: mockId.evento(5),
    proyecto_id: null,
    publicado_por: P.maria,
    fecha: "2026-08-28",
    creado_en: "2026-08-29T12:00:00Z",
  },
  {
    id: mockId.evidencia(3),
    titulo: "Primer sprint de la plataforma",
    descripcion: "Sesión de trabajo para definir el diseño y la base de datos.",
    fotos: ["/mock/evidencia-3.svg"],
    evento_id: null,
    proyecto_id: mockId.proyecto(1),
    publicado_por: P.isacar,
    fecha: "2026-08-12",
    creado_en: "2026-08-12T23:00:00Z",
  },
]);
