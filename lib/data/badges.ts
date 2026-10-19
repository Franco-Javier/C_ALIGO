import type { Badge, BadgeOtorgado, PerfilResumen } from "@/types/database";
import { MOCK_BADGES, MOCK_PERFIL_BADGES, mockPerfilResumen } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { PERFIL_RESUMEN, isMockMode, throwIfError } from "./shared";

export async function getBadgesDePerfil(perfilId: string): Promise<BadgeOtorgado[]> {
  if (isMockMode) {
    return MOCK_PERFIL_BADGES.filter((pb) => pb.perfil_id === perfilId).flatMap((pb) => {
      const badge = MOCK_BADGES.find((b) => b.id === pb.badge_id);
      return badge ? [{ ...badge, otorgado_en: pb.otorgado_en }] : [];
    });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("perfil_badges")
    .select("otorgado_en, badge:badges(*)")
    .eq("perfil_id", perfilId)
    .order("otorgado_en")
    .overrideTypes<{ otorgado_en: string | null; badge: Badge | null }[], { merge: false }>();
  throwIfError(error, "getBadgesDePerfil");
  return (data ?? []).flatMap(({ badge, otorgado_en }) =>
    badge ? [{ ...badge, otorgado_en }] : [],
  );
}

export async function getBadgesDeProyecto(proyectoId: string): Promise<Badge[]> {
  if (isMockMode) return MOCK_BADGES.filter((b) => b.proyecto_id === proyectoId);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("proyecto_id", proyectoId);
  throwIfError(error, "getBadgesDeProyecto");
  return data ?? [];
}

export type BadgeConOtorgados = Badge & {
  otorgados: { perfil: PerfilResumen; otorgado_en: string | null }[];
};

/** Todos los badges con quién los tiene (panel admin). */
export async function getBadgesAdmin(): Promise<BadgeConOtorgados[]> {
  if (isMockMode) {
    return [...MOCK_BADGES]
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
      .map((badge) => ({
        ...badge,
        otorgados: MOCK_PERFIL_BADGES.filter((pb) => pb.badge_id === badge.id).flatMap((pb) => {
          const perfil = mockPerfilResumen(pb.perfil_id);
          return perfil ? [{ perfil, otorgado_en: pb.otorgado_en }] : [];
        }),
      }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("badges")
    .select(`*, otorgados:perfil_badges(otorgado_en, perfil:perfiles(${PERFIL_RESUMEN}))`)
    .order("nombre")
    .overrideTypes<
      (Badge & { otorgados: { otorgado_en: string | null; perfil: PerfilResumen | null }[] })[],
      { merge: false }
    >();
  throwIfError(error, "getBadgesAdmin");
  return (data ?? []).map((b) => ({
    ...b,
    otorgados: b.otorgados.flatMap((o) => (o.perfil ? [{ perfil: o.perfil, otorgado_en: o.otorgado_en }] : [])),
  }));
}
