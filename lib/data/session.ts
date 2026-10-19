import { cache } from "react";
import type { Perfil } from "@/types/database";
import { getMockSession } from "@/lib/mock/session";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "./shared";

/**
 * Perfil del usuario con sesión, o null si es visitante.
 * Lee cookies (también en modo mock): llamarlo dentro de <Suspense>.
 */
export const getCurrentUser = cache(async (): Promise<Perfil | null> => {
  if (isMockMode) return getMockSession();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  return data;
});
