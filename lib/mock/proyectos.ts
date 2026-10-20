import type { Proyecto, ProyectoMiembro } from "@/types/database";
import { P, mockId } from "./ids";
import { shared } from "./store";

export const MOCK_PROYECTOS: Proyecto[] = shared("MOCK_PROYECTOS", () => [
  {
    id: mockId.proyecto(1),
    nombre: "Plataforma C_ALIGO",
    descripcion: "La web de la comunidad: eventos, proyectos, foros y perfiles.",
    estado: "en_progreso",
    repo_github: "Franco-Javier/C_ALIGO",
    imagen_url: "/mock/proyecto-1.svg",
    responsable_id: P.francisco,
    creado_en: "2026-08-05T12:00:00Z",
  },
  {
    id: mockId.proyecto(2),
    nombre: "Sistema de reservas UTP",
    descripcion: "Reserva de laboratorios y aulas para estudiantes y docentes.",
    estado: "en_progreso",
    repo_github: null,
    imagen_url: "/mock/proyecto-2.svg",
    responsable_id: P.isacar,
    creado_en: "2026-08-20T12:00:00Z",
  },
  {
    id: mockId.proyecto(3),
    nombre: "Laboratorio CTF local",
    descripcion: "Retos de ciberseguridad para practicar en los talleres.",
    estado: "pausado",
    repo_github: null,
    imagen_url: null,
    responsable_id: P.maria,
    creado_en: "2026-09-01T12:00:00Z",
  },
  {
    id: mockId.proyecto(4),
    nombre: "Monitor de red del campus",
    descripcion: "Dashboard que muestra el estado de los puntos de acceso.",
    estado: "idea",
    repo_github: null,
    imagen_url: null,
    responsable_id: P.jose,
    creado_en: "2026-09-25T12:00:00Z",
  },
  {
    id: mockId.proyecto(5),
    nombre: "Bot de bienvenida",
    descripcion: "Bot que saluda y guía a los nuevos miembros.",
    estado: "terminado",
    repo_github: null,
    imagen_url: null,
    responsable_id: P.ana,
    creado_en: "2026-08-10T12:00:00Z",
  },
]);

const m = (
  proyecto: number,
  perfil_id: string,
  funcion: string,
  unido_en: string,
): ProyectoMiembro => ({ proyecto_id: mockId.proyecto(proyecto), perfil_id, funcion, unido_en });

export const MOCK_PROYECTO_MIEMBROS: ProyectoMiembro[] = shared("MOCK_PROYECTO_MIEMBROS", () => [
  m(1, P.francisco, "fullstack", "2026-08-05T12:00:00Z"),
  m(1, P.ana, "frontend", "2026-08-12T12:00:00Z"),
  m(1, P.isacar, "backend", "2026-08-12T12:00:00Z"),
  m(1, P.maria, "seguridad", "2026-08-14T12:00:00Z"),
  m(1, P.jose, "infraestructura", "2026-08-20T12:00:00Z"),
  m(2, P.isacar, "backend", "2026-08-20T12:00:00Z"),
  m(2, P.ana, "frontend", "2026-08-22T12:00:00Z"),
  m(3, P.maria, "pentesting", "2026-09-01T12:00:00Z"),
  m(3, P.laura, "retos", "2026-09-02T12:00:00Z"),
  m(4, P.jose, "redes", "2026-09-25T12:00:00Z"),
  m(5, P.ana, "desarrollo", "2026-08-10T12:00:00Z"),
]);
