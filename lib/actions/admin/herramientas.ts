"use server";

import type { TablesInsert } from "@/types/database";
import { FormError, readText, readUrl } from "@/lib/forms";
import { MOCK_HERRAMIENTAS } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { NOT_FOUND, dbError, directivaAction, mockRemoveWhere, mockSave } from "./shared";

function readHerramienta(form: FormData) {
  const orden = Number(form.get("orden") ?? 0);
  if (!Number.isInteger(orden) || orden < 0 || orden > 999) throw new FormError("El orden debe ser un número entre 0 y 999");
  return {
    nombre: readText(form, "nombre", { label: "El nombre", required: true, max: 60 }),
    descripcion: readText(form, "descripcion", { label: "La descripción", max: 200 }),
    categoria: readText(form, "categoria", { label: "La categoría", max: 40 }),
    url_descarga: readUrl(form, "url_descarga", { label: "El enlace de descarga", required: true })!,
    // En /herramientas el ícono se muestra sin optimizar: puede ser de cualquier dominio.
    icono_url: readUrl(form, "icono_url", { label: "El ícono" }),
    orden,
  } satisfies TablesInsert<"herramientas">;
}

export async function saveHerramienta(id: string | null, form: FormData) {
  return directivaAction(async () => {
    const herramienta = readHerramienta(form);

    if (isMockMode) return mockSave(MOCK_HERRAMIENTAS, id, herramienta) ? { ok: true } : NOT_FOUND;

    const supabase = await createClient();
    const { error } = id
      ? await supabase.from("herramientas").update(herramienta).eq("id", id)
      : await supabase.from("herramientas").insert(herramienta);
    return error ? dbError("guardar la herramienta") : { ok: true };
  });
}

export async function deleteHerramienta(id: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_HERRAMIENTAS, (h) => h.id === id);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("herramientas").delete().eq("id", id);
    return error ? dbError("eliminar la herramienta") : { ok: true };
  });
}
