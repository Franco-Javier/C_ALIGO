"use server";

import { revalidatePath } from "next/cache";
import { getMiembroOrError } from "@/lib/auth/guards";
import { formError, readText } from "@/lib/forms";
import { isDirectiva } from "@/lib/labels";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import * as mock from "./foros-mock";
import type { ActionResult } from "./types";

const readContenido = (form: FormData) =>
  readText(form, "contenido", { label: "El mensaje", required: true, max: 2000 });

/** Crea un hilo con su primer mensaje. Devuelve el id del hilo para navegar a él. */
export async function crearHilo(foroId: string, form: FormData): Promise<ActionResult<string>> {
  const { user, error } = await getMiembroOrError();
  if (!user) return { ok: false, error };

  let titulo: string, contenido: string;
  try {
    titulo = readText(form, "titulo", { label: "El título", required: true, max: 120 });
    contenido = readContenido(form);
  } catch (e) {
    return formError(e);
  }

  let hiloId: string;
  if (isMockMode) {
    hiloId = mock.crearHilo(foroId, user.id, titulo, contenido);
  } else {
    const supabase = await createClient();
    const { data, error: dbError } = await supabase
      .from("hilos")
      .insert({ foro_id: foroId, titulo, autor_id: user.id })
      .select("id")
      .single();
    if (dbError) return { ok: false, error: "No se pudo crear el hilo" };
    hiloId = data.id;
    await supabase.from("mensajes").insert({ hilo_id: hiloId, autor_id: user.id, contenido });
    await supabase.from("perfiles").update({ ultima_actividad: new Date().toISOString() }).eq("id", user.id);
  }

  revalidatePath("/foros", "layout");
  return { ok: true, data: hiloId };
}

/** Envía un mensaje y actualiza `perfiles.ultima_actividad` (§7.6). */
export async function enviarMensaje(hiloId: string, form: FormData): Promise<ActionResult> {
  const { user, error } = await getMiembroOrError();
  if (!user) return { ok: false, error };

  let contenido: string;
  try {
    contenido = readContenido(form);
  } catch (e) {
    return formError(e);
  }

  if (isMockMode) {
    if (!mock.enviarMensaje(hiloId, user.id, contenido)) return { ok: false, error: "El hilo no existe" };
  } else {
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("mensajes")
      .insert({ hilo_id: hiloId, autor_id: user.id, contenido });
    if (dbError) return { ok: false, error: "No se pudo enviar el mensaje" };
    await supabase.from("perfiles").update({ ultima_actividad: new Date().toISOString() }).eq("id", user.id);
  }

  revalidatePath("/foros", "layout");
  return { ok: true };
}

/** Solo el autor puede editar su mensaje. */
export async function editarMensaje(mensajeId: string, form: FormData): Promise<ActionResult> {
  const { user, error } = await getMiembroOrError();
  if (!user) return { ok: false, error };

  let contenido: string;
  try {
    contenido = readContenido(form);
  } catch (e) {
    return formError(e);
  }

  if (isMockMode) {
    if (!mock.editarMensaje(mensajeId, user.id, contenido)) {
      return { ok: false, error: "Solo puedes editar tus mensajes" };
    }
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from("mensajes")
      .update({ contenido, editado_en: new Date().toISOString() })
      .eq("id", mensajeId)
      .eq("autor_id", user.id)
      .select("id");
    if (!data?.length) return { ok: false, error: "Solo puedes editar tus mensajes" };
  }

  revalidatePath("/foros", "layout");
  return { ok: true };
}

/** El autor borra los suyos; la directiva puede borrar cualquiera (RLS lo exige igual). */
export async function borrarMensaje(mensajeId: string): Promise<ActionResult> {
  const { user, error } = await getMiembroOrError();
  if (!user) return { ok: false, error };
  const moderador = isDirectiva(user.rol);

  if (isMockMode) {
    if (!mock.borrarMensaje(mensajeId, user.id, moderador)) {
      return { ok: false, error: "No puedes borrar este mensaje" };
    }
  } else {
    const supabase = await createClient();
    let query = supabase.from("mensajes").delete().eq("id", mensajeId);
    if (!moderador) query = query.eq("autor_id", user.id);
    const { data } = await query.select("id");
    if (!data?.length) return { ok: false, error: "No puedes borrar este mensaje" };
  }

  revalidatePath("/foros", "layout");
  return { ok: true };
}
