"use server";

import type { TablesInsert } from "@/types/database";
import { FormError, readImageUrl, readOptionalId, readText } from "@/lib/forms";
import { MOCK_BADGES, MOCK_PERFIL_BADGES } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/utils";
import { NOT_FOUND, dbError, directivaAction, mockRemoveWhere, mockSave } from "./shared";

/** El ícono es una URL por ahora; con Storage se subirá al bucket `badges`. */
function readBadge(form: FormData) {
  return {
    nombre: readText(form, "nombre", { label: "El nombre", required: true, max: 60 }),
    descripcion: readText(form, "descripcion", { label: "La descripción", max: 300 }),
    icono_url: readImageUrl(form, "icono_url", { label: "El ícono" }),
    proyecto_id: readOptionalId(form, "proyecto_id", { label: "El proyecto" }),
  } satisfies TablesInsert<"badges">;
}

export async function saveBadge(id: string | null, form: FormData) {
  return directivaAction(async () => {
    const badge = readBadge(form);

    if (isMockMode) {
      const original = id ? MOCK_BADGES.find((b) => b.id === id) : undefined;
      const ok = mockSave(MOCK_BADGES, id, { ...badge, creado_en: original?.creado_en ?? new Date().toISOString() });
      return ok ? { ok: true } : NOT_FOUND;
    }

    const supabase = await createClient();
    const { error } = id
      ? await supabase.from("badges").update(badge).eq("id", id)
      : await supabase.from("badges").insert(badge);
    return error ? dbError("guardar el badge") : { ok: true };
  });
}

/** Borra el badge y se lo quita a todos (perfil_badges en cascada). */
export async function deleteBadge(id: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_PERFIL_BADGES, (pb) => pb.badge_id === id);
      mockRemoveWhere(MOCK_BADGES, (b) => b.id === id);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("badges").delete().eq("id", id);
    return error ? dbError("eliminar el badge") : { ok: true };
  });
}

export async function otorgarBadge(badgeId: string, form: FormData) {
  return directivaAction(async () => {
    const perfilId = String(form.get("perfil_id") ?? "");
    if (!isUuid(perfilId)) throw new FormError("Elige un miembro");

    if (isMockMode) {
      if (!MOCK_PERFIL_BADGES.some((pb) => pb.badge_id === badgeId && pb.perfil_id === perfilId)) {
        MOCK_PERFIL_BADGES.push({ badge_id: badgeId, perfil_id: perfilId, otorgado_en: new Date().toISOString() });
      }
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("perfil_badges").insert({ badge_id: badgeId, perfil_id: perfilId });
    // 23505 = ya lo tenía: el resultado es el mismo.
    return error && error.code !== "23505" ? dbError("otorgar el badge") : { ok: true };
  });
}

export async function quitarBadge(badgeId: string, perfilId: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_PERFIL_BADGES, (pb) => pb.badge_id === badgeId && pb.perfil_id === perfilId);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("perfil_badges")
      .delete()
      .eq("badge_id", badgeId)
      .eq("perfil_id", perfilId);
    return error ? dbError("quitar el badge") : { ok: true };
  });
}
