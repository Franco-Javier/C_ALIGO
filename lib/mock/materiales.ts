import type { Material } from "@/types/database";
import { P, mockId } from "./ids";
import { shared } from "./store";

export const MOCK_MATERIALES: Material[] = shared("MOCK_MATERIALES", () => [
  { id: mockId.material(1), titulo: "Guía de Python desde cero", descripcion: "Sintaxis básica, estructuras de datos y ejercicios.", tipo: "documento", url: "https://docs.python.org/es/3/tutorial/", tema: "Python", subido_por: P.ana, creado_en: "2026-10-12T12:00:00Z" },
  { id: mockId.material(2), titulo: "Curso de Git interactivo", descripcion: null, tipo: "curso", url: "https://learngitbranching.js.org/?locale=es_ES", tema: "Git", subido_por: P.francisco, creado_en: "2026-10-01T12:00:00Z" },
  { id: mockId.material(3), titulo: "Introducción a Nmap", descripcion: "Escaneo de puertos explicado paso a paso.", tipo: "video", url: "https://nmap.org/book/man.html", tema: "Pentesting", subido_por: P.maria, creado_en: "2026-09-20T12:00:00Z" },
  { id: mockId.material(4), titulo: "Documentación de C#", descripcion: null, tipo: "link", url: "https://learn.microsoft.com/es-es/dotnet/csharp/", tema: "C#", subido_por: P.isacar, creado_en: "2026-09-05T12:00:00Z" },
]);
