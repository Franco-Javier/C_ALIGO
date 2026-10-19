"use server";

import type { TablesUpdate } from "@/types/database";
import { FormError, readEnum } from "@/lib/forms";
import { AREA_LABEL, ESTADO_USUARIO_LABEL, ROL_LABEL } from "@/lib/labels";
import { MOCK_PERFILES } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { NOT_FOUND, dbError, directivaAction } from "./shared";

/**
 * Cambia rol, área y estado de un miembro (incluye reactivar). Nunca se elimina a nadie.
 * Para no quedarse fuera del panel, nadie puede cambiar su propio rol ni estado.
 */
export async function updateMiembro(id: string | null, form: FormData) {
  return directivaAction(async (user) => {
    if (!id) return NOT_FOUND;
    const cambios = {
      rol: readEnum(form, "rol", ROL_LABEL, { label: "El rol", required: true })!,
      area: readEnum(form, "area", AREA_LABEL, { label: "El área" }),
      estado: readEnum(form, "estado", ESTADO_USUARIO_LABEL, { label: "El estado", required: true })!,
    } satisfies TablesUpdate<"perfiles">;

    if (id === user.id && (cambios.rol !== user.rol || cambios.estado !== user.estado)) {
      throw new FormError("No puedes cambiar tu propio rol ni estado");
    }

    if (isMockMode) {
      const perfil = MOCK_PERFILES.find((p) => p.id === id);
      if (!perfil) return NOT_FOUND;
      Object.assign(perfil, cambios);
      return { ok: true };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from("perfiles").update(cambios).eq("id", id).select("id");
    if (error) return dbError("actualizar al miembro");
    return data.length ? { ok: true } : NOT_FOUND;
  });
}
