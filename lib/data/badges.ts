import type { Badge, BadgeOtorgado } from "@/types/database";
import { MOCK_BADGES, MOCK_PERFIL_BADGES } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

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
