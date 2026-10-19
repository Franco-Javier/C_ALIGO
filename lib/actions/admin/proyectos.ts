"use server";

import type { TablesInsert } from "@/types/database";
import { FormError, readEnum, readImageUrl, readOptionalId, readText } from "@/lib/forms";
import { ESTADO_PROYECTO_LABEL } from "@/lib/labels";
import { MOCK_BADGES, MOCK_EVIDENCIAS, MOCK_PROYECTO_MIEMBROS, MOCK_PROYECTOS } from "@/lib/mock";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/utils";
import { NOT_FOUND, dbError, directivaAction, mockRemoveWhere, mockSave } from "./shared";

const REPO = /^[\w.-]+\/[\w.-]+$/;

function readProyecto(form: FormData) {
  const repo = readText(form, "repo_github", { label: "El repositorio", max: 140 })
    ?.replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\.git$|\/$/g, "");
  if (repo && !REPO.test(repo)) throw new FormError("El repositorio debe tener el formato usuario/repositorio");
  return {
    nombre: readText(form, "nombre", { label: "El nombre", required: true, max: 120 }),
    descripcion: readText(form, "descripcion", { label: "La descripción", max: 2000 }),
    estado: readEnum(form, "estado", ESTADO_PROYECTO_LABEL, { label: "El estado", required: true })!,
    repo_github: repo ?? null,
    imagen_url: readImageUrl(form, "imagen_url", { label: "La imagen" }),
    responsable_id: readOptionalId(form, "responsable_id", { label: "El responsable" }),
  } satisfies TablesInsert<"proyectos">;
}

export async function saveProyecto(id: string | null, form: FormData) {
  return directivaAction(async () => {
    const proyecto = readProyecto(form);

    if (isMockMode) {
      const original = id ? MOCK_PROYECTOS.find((p) => p.id === id) : undefined;
      const ok = mockSave(MOCK_PROYECTOS, id, {
        ...proyecto,
        creado_en: original?.creado_en ?? new Date().toISOString(),
      });
      return ok ? { ok: true } : NOT_FOUND;
    }

    const supabase = await createClient();
    const { error } = id
      ? await supabase.from("proyectos").update(proyecto).eq("id", id)
      : await supabase.from("proyectos").insert(proyecto);
    return error ? dbError("guardar el proyecto") : { ok: true };
  });
}

/** Borra el proyecto y su equipo; sus badges y evidencias quedan sin proyecto (FK). */
export async function deleteProyecto(id: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_PROYECTO_MIEMBROS, (m) => m.proyecto_id === id);
      MOCK_BADGES.forEach((b) => b.proyecto_id === id && (b.proyecto_id = null));
      MOCK_EVIDENCIAS.forEach((e) => e.proyecto_id === id && (e.proyecto_id = null));
      mockRemoveWhere(MOCK_PROYECTOS, (p) => p.id === id);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("proyectos").delete().eq("id", id);
    return error ? dbError("eliminar el proyecto") : { ok: true };
  });
}

/** Agrega un integrante con su función, o actualiza la función si ya estaba. */
export async function addIntegrante(proyectoId: string, form: FormData) {
  return directivaAction(async () => {
    const perfilId = String(form.get("perfil_id") ?? "");
    if (!isUuid(perfilId)) throw new FormError("Elige un miembro");
    const funcion = readText(form, "funcion", { label: "La función", max: 60 });

    if (isMockMode) {
      const actual = MOCK_PROYECTO_MIEMBROS.find((m) => m.proyecto_id === proyectoId && m.perfil_id === perfilId);
      if (actual) actual.funcion = funcion;
      else {
        MOCK_PROYECTO_MIEMBROS.push({
          proyecto_id: proyectoId,
          perfil_id: perfilId,
          funcion,
          unido_en: new Date().toISOString(),
        });
      }
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("proyecto_miembros")
      .upsert({ proyecto_id: proyectoId, perfil_id: perfilId, funcion });
    return error ? dbError("agregar al integrante") : { ok: true };
  });
}

export async function removeIntegrante(proyectoId: string, perfilId: string) {
  return directivaAction(async () => {
    if (isMockMode) {
      mockRemoveWhere(MOCK_PROYECTO_MIEMBROS, (m) => m.proyecto_id === proyectoId && m.perfil_id === perfilId);
      return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("proyecto_miembros")
      .delete()
      .eq("proyecto_id", proyectoId)
      .eq("perfil_id", perfilId);
    return error ? dbError("quitar al integrante") : { ok: true };
  });
}
