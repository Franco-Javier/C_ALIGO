"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/data/session";
import { isMiembro } from "@/lib/labels";
import { MOCK_EVENTO_ASISTENTES, MOCK_EVENTOS } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "./types";

/** Marca o quita "Asistiré" del usuario actual en un evento próximo. */
export async function setAsistencia(eventoId: string, asistir: boolean): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Inicia sesión para inscribirte" };
  if (!isMiembro(user.estado)) return { ok: false, error: "Primero resuelve el reto de ingreso" };

  const result = isMockMode
    ? setAsistenciaMock(eventoId, user.id, asistir)
    : await setAsistenciaSupabase(eventoId, user.id, asistir);

  if (result.ok) {
    revalidatePath("/eventos");
    revalidatePath(`/eventos/${eventoId}`);
  }
  return result;
}

const EVENTO_PASADO: ActionResult = { ok: false, error: "Este evento ya pasó" };

// Fase 0/1: muta los mocks en memoria. Solo sirve en `next dev` (un único proceso).
function setAsistenciaMock(eventoId: string, perfilId: string, asistir: boolean): ActionResult {
  const evento = MOCK_EVENTOS.find((e) => e.id === eventoId);
  if (!evento) return { ok: false, error: "El evento no existe" };
  if (new Date(evento.fecha_inicio) < new Date()) return EVENTO_PASADO;

  const index = MOCK_EVENTO_ASISTENTES.findIndex(
    (a) => a.evento_id === eventoId && a.perfil_id === perfilId,
  );
  if (asistir && index === -1) MOCK_EVENTO_ASISTENTES.push({ evento_id: eventoId, perfil_id: perfilId });
  if (!asistir && index !== -1) MOCK_EVENTO_ASISTENTES.splice(index, 1);
  return { ok: true };
}

async function setAsistenciaSupabase(
  eventoId: string,
  perfilId: string,
  asistir: boolean,
): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: evento } = await supabase
    .from("eventos")
    .select("fecha_inicio")
    .eq("id", eventoId)
    .maybeSingle();
  if (!evento) return { ok: false, error: "El evento no existe" };
  if (new Date(evento.fecha_inicio) < new Date()) return EVENTO_PASADO;

  if (asistir) {
    const { error } = await supabase
      .from("evento_asistentes")
      .insert({ evento_id: eventoId, perfil_id: perfilId });
    // 23505 = ya estaba inscrito: el resultado es el mismo.
    if (error && error.code !== "23505") return { ok: false, error: "No se pudo registrar tu asistencia" };
    return { ok: true };
  }

  // Requiere una política RLS de DELETE en evento_asistentes; sin ella no borra nada.
  const { data, error } = await supabase
    .from("evento_asistentes")
    .delete()
    .eq("evento_id", eventoId)
    .eq("perfil_id", perfilId)
    .select();
  if (error || data.length === 0) return { ok: false, error: "No se pudo quitar tu asistencia" };
  return { ok: true };
}
