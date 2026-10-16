import type { Herramienta } from "@/types/database";
import { mockId } from "./ids";

// Herramientas iniciales de supabase/schema.sql.
export const MOCK_HERRAMIENTAS: Herramienta[] = [
  { id: mockId.herramienta(1), nombre: "GitHub Desktop", descripcion: null, categoria: "Control de versiones", url_descarga: "https://desktop.github.com", icono_url: null, orden: 1 },
  { id: mockId.herramienta(2), nombre: "VS Code", descripcion: null, categoria: "Editor", url_descarga: "https://code.visualstudio.com/download", icono_url: null, orden: 2 },
  { id: mockId.herramienta(3), nombre: "NetBeans", descripcion: null, categoria: "IDE", url_descarga: "https://netbeans.apache.org/download", icono_url: null, orden: 3 },
  { id: mockId.herramienta(4), nombre: "Figma", descripcion: null, categoria: "Diseño", url_descarga: "https://www.figma.com/downloads", icono_url: null, orden: 4 },
  { id: mockId.herramienta(5), nombre: "Framer", descripcion: null, categoria: "Diseño web", url_descarga: "https://www.framer.com", icono_url: null, orden: 5 },
  { id: mockId.herramienta(6), nombre: "Blender", descripcion: null, categoria: "3D", url_descarga: "https://www.blender.org/download", icono_url: null, orden: 6 },
];
