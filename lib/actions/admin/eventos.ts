"use server";

import type { TablesInsert } from "@/types/database";
import { readCheckbox, readDateTime, readEnum, readText, FormError } from "@/lib/forms";
import { TIPO_EVENTO_LABEL } from "@/lib/labels";
import { MOCK_EVENTO_ASISTENTES, MOCK_EVENTOS, MOCK_EVIDENCIAS } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { NOT_FOUND, dbError, directivaAction, mockRemoveWhere, mockSave } from "./shared";

function readEvento(form: FormData) {
  const fecha_inicio = readDateTime(form, "fecha_inicio", { label: "La fecha de inicio", required: true })!;
  const fecha_fin = readDateTime(form, "fecha_fin", { label: "La fecha de fin" });
  if (fecha_fin && fecha_fin < fecha_inicio) throw new FormError("El fin no puede ser antes del inicio");
  return {
    titulo: readText(form, "titulo", { label: "El título", required: true, max: 150 }),
    descripcion: readText(form, "descripcion", { label: "La descripción", max: 2000 }),
    tipo: readEnum(form, "tipo", TIPO_EVENTO_LABEL, { label: "El tipo", required: true })!,
    fecha_inicio,
    fecha_fin,
    lugar: readText(form, "lugar", { label: "El lugar", max: 150 }),
    validado_utp: readCheckbox(form, "validado_utp"),
  } satisfies TablesInsert<"eventos">;
}

export async function saveEvento(id: string | null, form: FormData) {
  return directivaAction(async (user) => {
    const evento = readEvento(form);

    if (isMockMode) {
      const original = id ? MOCK_EVENTOS.find((e) => e.id === id) : undefined;
      const ok = mockSave(MOCK_EVENTOS, id, {
        ...evento,
        creado_por: original?.creado_por ?? user.id,
        creado_en: original?.creado_en ?? new Date().toISOString(),
      });
      return ok ? { ok: true } : NOT_FOUND;
    }

    const supabase = await createClient();
    const { error } = id
      ? await supabase.from("eventos").update(evento).eq("id", id)
      : await supabase.from("eventos").insert({ ...evento, creado_por: user.id });
    return error ? dbError("guardar el evento") : { ok: true };
  });
}

/** Borra el evento; sus asistencias se borran y sus evidencias quedan sin evento (FK). */
export async function deleteEvento(id: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_EVENTO_ASISTENTES, (a) => a.evento_id === id);
      MOCK_EVIDENCIAS.forEach((e) => e.evento_id === id && (e.evento_id = null));
      mockRemoveWhere(MOCK_EVENTOS, (e) => e.id === id);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    return error ? dbError("eliminar el evento") : { ok: true };
  });
}
