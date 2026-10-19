"use server";

import { revalidatePath } from "next/cache";
import type { TablesInsert } from "@/types/database";
import { getMiembroOrError } from "@/lib/auth/guards";
import { formError, readEnum, readText, readUrl } from "@/lib/forms";
import { TIPO_MATERIAL_LABEL } from "@/lib/labels";
import { MOCK_MATERIALES } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "./types";

/**
 * Cualquier miembro sube un material (§7.7). Por ahora siempre es un enlace:
 * la subida de documentos al bucket `materiales` llega con la integración de Storage.
 */
export async function crearMaterial(form: FormData): Promise<ActionResult> {
  const { user, error } = await getMiembroOrError();
  if (!user) return { ok: false, error };

  let material: TablesInsert<"materiales">;
  try {
    material = {
      titulo: readText(form, "titulo", { label: "El título", required: true, max: 150 }),
      descripcion: readText(form, "descripcion", { label: "La descripción", max: 500 }),
      tipo: readEnum(form, "tipo", TIPO_MATERIAL_LABEL, { label: "El tipo", required: true })!,
      url: readUrl(form, "url", { label: "El enlace", required: true })!,
      tema: readText(form, "tema", { label: "El tema", max: 40 }),
      subido_por: user.id,
    };
  } catch (e) {
    return formError(e);
  }

  if (isMockMode) {
    MOCK_MATERIALES.push({
      id: crypto.randomUUID(),
      creado_en: new Date().toISOString(),
      descripcion: null,
      tema: null,
      subido_por: null,
      ...material,
    });
  } else {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("materiales").insert(material);
    if (dbError) return { ok: false, error: "No se pudo subir el material" };
  }

  revalidatePath("/materiales");
  return { ok: true };
}
