import "server-only";
import { MOCK_HILOS, MOCK_MENSAJES, MOCK_PERFILES } from "@/lib/mock";

// Fase 0/1: mutaciones en memoria de los foros. Las llama lib/actions/foros.ts.

const now = () => new Date().toISOString();

function tocarActividad(perfilId: string) {
  const perfil = MOCK_PERFILES.find((p) => p.id === perfilId);
  if (perfil) perfil.ultima_actividad = now();
}

export function crearHilo(foroId: string, autorId: string, titulo: string, contenido: string) {
  const id = crypto.randomUUID();
  MOCK_HILOS.push({ id, foro_id: foroId, titulo, autor_id: autorId, fijado: false, creado_en: now() });
  enviarMensaje(id, autorId, contenido);
  return id;
}

export function enviarMensaje(hiloId: string, autorId: string, contenido: string) {
  if (!MOCK_HILOS.some((h) => h.id === hiloId)) return false;
  MOCK_MENSAJES.push({
    id: crypto.randomUUID(),
    hilo_id: hiloId,
    autor_id: autorId,
    contenido,
    creado_en: now(),
    editado_en: null,
  });
  tocarActividad(autorId);
  return true;
}

export function editarMensaje(mensajeId: string, autorId: string, contenido: string) {
  const mensaje = MOCK_MENSAJES.find((m) => m.id === mensajeId && m.autor_id === autorId);
  if (!mensaje) return false;
  Object.assign(mensaje, { contenido, editado_en: now() });
  return true;
}

export function borrarMensaje(mensajeId: string, perfilId: string, moderador: boolean) {
  const index = MOCK_MENSAJES.findIndex(
    (m) => m.id === mensajeId && (moderador || m.autor_id === perfilId),
  );
  if (index === -1) return false;
  MOCK_MENSAJES.splice(index, 1);
  return true;
}
