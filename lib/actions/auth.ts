"use server";

import { redirect } from "next/navigation";
import { P } from "@/lib/mock/ids";
import { setMockSession } from "@/lib/mock/session";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** "Continuar con GitHub" (§7.2). Al volver, /auth/callback decide a dónde ir. */
export async function signInWithGithub() {
  if (isMockMode) {
    // Simula un registro nuevo: entra como el perfil `pendiente` de los mocks.
    await setMockSession(P.nuevo);
    redirect("/auth/callback");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${SITE_URL}/auth/callback` },
  });
  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}

/** Solo modo mock: navegar como otro perfil para revisar cada rol y estado. */
export async function signInAsMock(perfilId: string) {
  if (!isMockMode) return;
  await setMockSession(perfilId);
  redirect("/auth/callback");
}

export async function signOut() {
  if (isMockMode) {
    await setMockSession(null);
  } else {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
