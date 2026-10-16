import { cache } from "react";
import type { Perfil } from "@/types/database";
import { MOCK_USUARIO } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "./shared";

/**
 * Perfil del usuario con sesión, o null si es visitante.
 * Con Supabase lee cookies (es dinámico): llamarlo dentro de <Suspense>.
 */
export const getCurrentUser = cache(async (): Promise<Perfil | null> => {
  if (isMockMode) return MOCK_USUARIO;

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
