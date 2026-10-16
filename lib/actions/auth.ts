"use server";

import { redirect } from "next/navigation";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  // Fase 0: la sesión es MOCK_USUARIO, no hay nada que cerrar.
  if (!isMockMode) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
