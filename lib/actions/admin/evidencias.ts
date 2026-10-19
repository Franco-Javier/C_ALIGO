"use server";

import type { TablesInsert } from "@/types/database";
import { FormError, isImageUrl, readOptionalId, readText } from "@/lib/forms";
import { MOCK_EVIDENCIAS } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { NOT_FOUND, dbError, directivaAction, mockRemoveWhere, mockSave } from "./shared";

/**
 * Fotos: una URL por línea. Con Storage, el formulario subirá y comprimirá los
 * archivos al bucket `evidencias` y llenará esta lista con sus URLs públicas.
 */
function readFotos(form: FormData) {
  const fotos = String(form.get("fotos") ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (fotos.length > 20) throw new FormError("Máximo 20 fotos por evidencia");
  const invalida = fotos.find((f) => !isImageUrl(f));
  if (invalida) throw new FormError(`"${invalida}" debe ser una ruta local o una URL de Supabase Storage`);
  return fotos;
}

function readEvidencia(form: FormData) {
  const fecha = String(form.get("fecha") ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) throw new FormError("La fecha es obligatoria");
  return {
    titulo: readText(form, "titulo", { label: "El título", required: true, max: 150 }),
    descripcion: readText(form, "descripcion", { label: "La descripción", max: 2000 }),
    fotos: readFotos(form),
    fecha,
    evento_id: readOptionalId(form, "evento_id"),
    proyecto_id: readOptionalId(form, "proyecto_id"),
  } satisfies TablesInsert<"evidencias">;
}

export async function saveEvidencia(id: string | null, form: FormData) {
  return directivaAction(async (user) => {
    const evidencia = readEvidencia(form);

    if (isMockMode) {
      const original = id ? MOCK_EVIDENCIAS.find((e) => e.id === id) : undefined;
      const ok = mockSave(MOCK_EVIDENCIAS, id, {
        ...evidencia,
        publicado_por: original?.publicado_por ?? user.id,
        creado_en: original?.creado_en ?? new Date().toISOString(),
      });
      return ok ? { ok: true } : NOT_FOUND;
    }

    const supabase = await createClient();
    const { error } = id
      ? await supabase.from("evidencias").update(evidencia).eq("id", id)
      : await supabase.from("evidencias").insert({ ...evidencia, publicado_por: user.id });
    return error ? dbError("guardar la evidencia") : { ok: true };
  });
}

/** Borra la fila. Con Storage, también habrá que borrar sus archivos del bucket. */
export async function deleteEvidencia(id: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_EVIDENCIAS, (e) => e.id === id);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("evidencias").delete().eq("id", id);
    return error ? dbError("eliminar la evidencia") : { ok: true };
  });
}
