import type { Foro, Hilo, Mensaje } from "@/types/database";
import { P, mockId } from "./ids";

const CREADO = "2026-08-01T12:00:00Z";

// Foros iniciales de supabase/schema.sql + un subforo de ejemplo.
export const MOCK_FOROS: Foro[] = [
  { id: mockId.foro(1), nombre: "General", descripcion: "Conversación libre de la comunidad", foro_padre_id: null, orden: 1, creado_en: CREADO },
  { id: mockId.foro(2), nombre: "Programación", descripcion: "Python, C, C#, Java y más", foro_padre_id: null, orden: 2, creado_en: CREADO },
  { id: mockId.foro(3), nombre: "Ciberseguridad", descripcion: "Pentesting, HackTheBox, CTFs", foro_padre_id: null, orden: 3, creado_en: CREADO },
  { id: mockId.foro(4), nombre: "Redes", descripcion: "Infraestructura y redes informáticas", foro_padre_id: null, orden: 4, creado_en: CREADO },
  { id: mockId.foro(5), nombre: "IA y Agentes", descripcion: "Inteligencia artificial y agentes", foro_padre_id: null, orden: 5, creado_en: CREADO },
  { id: mockId.foro(6), nombre: "Python", descripcion: "Dudas y recursos de Python", foro_padre_id: mockId.foro(2), orden: 1, creado_en: CREADO },
];

export const MOCK_HILOS: Hilo[] = [
  { id: mockId.hilo(1), foro_id: mockId.foro(1), titulo: "Bienvenidos a C_ALIGO", autor_id: P.francisco, fijado: true, creado_en: "2026-08-01T13:00:00Z" },
  { id: mockId.hilo(2), foro_id: mockId.foro(1), titulo: "¿Qué stack usar para la plataforma?", autor_id: P.ana, fijado: false, creado_en: "2026-08-06T15:30:00Z" },
  { id: mockId.hilo(3), foro_id: mockId.foro(3), titulo: "Writeups del último CTF", autor_id: P.maria, fijado: false, creado_en: "2026-09-10T20:00:00Z" },
];

export const MOCK_MENSAJES: Mensaje[] = [
  { id: mockId.mensaje(1), hilo_id: mockId.hilo(1), autor_id: P.francisco, contenido: "Este es el espacio para coordinar todo. ¡Preséntense!", creado_en: "2026-08-01T13:00:00Z", editado_en: null },
  { id: mockId.mensaje(2), hilo_id: mockId.hilo(2), autor_id: P.ana, contenido: "Yo propongo Next.js con Tailwind.", creado_en: "2026-08-06T15:32:00Z", editado_en: null },
  { id: mockId.mensaje(3), hilo_id: mockId.hilo(2), autor_id: P.jose, contenido: "+1, y Supabase para la BD.", creado_en: "2026-08-06T15:35:00Z", editado_en: null },
  { id: mockId.mensaje(4), hilo_id: mockId.hilo(3), autor_id: P.maria, contenido: "Dejo aquí mis notas del reto web.", creado_en: "2026-09-10T20:01:00Z", editado_en: null },
];
