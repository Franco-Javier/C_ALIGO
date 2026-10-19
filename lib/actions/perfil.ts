"use server";

import { revalidatePath } from "next/cache";
import type { TablesUpdate } from "@/types/database";
import { getMiembroOrError } from "@/lib/auth/guards";
import { formError, readEnum, readText } from "@/lib/forms";
import { AREA_LABEL } from "@/lib/labels";
import { MOCK_PERFILES } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "./types";

/** Editar mi perfil (§7.12). Nunca toca rol ni estado (además los protege un trigger). */
export async function updateMiPerfil(form: FormData): Promise<ActionResult> {
  const { user, error } = await getMiembroOrError();
  if (!user) return { ok: false, error };

  let cambios: TablesUpdate<"perfiles">;
  try {
    cambios = {
      nombre: readText(form, "nombre", { label: "El nombre", required: true, max: 80 }),
      carrera: readText(form, "carrera", { label: "La carrera", max: 100 }),
      area: readEnum(form, "area", AREA_LABEL, { label: "El área" }),
      bio: readText(form, "bio", { label: "La bio", max: 500 }),
    };
  } catch (e) {
    return formError(e);
  }

  if (isMockMode) {
    const perfil = MOCK_PERFILES.find((p) => p.id === user.id);
    if (perfil) Object.assign(perfil, cambios);
  } else {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("perfiles").update(cambios).eq("id", user.id);
    if (dbError) return { ok: false, error: "No se pudo guardar tu perfil" };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
