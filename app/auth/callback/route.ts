import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/data/session";
import { isMiembro } from "@/lib/labels";
import { isMockMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/**
 * Retorno de GitHub OAuth (§7.2): intercambia el código por la sesión y redirige
 * a /puzzle si el perfil está pendiente, o a / si ya es miembro.
 * El perfil lo crea el trigger `crear_perfil_nuevo`; aquí no se inserta nada.
 */
export async function GET(request: NextRequest) {
  const { origin, searchParams } = request.nextUrl;
  const fail = () => NextResponse.redirect(`${origin}/login?error=oauth`);

  if (isMockMode) {
    const user = await getCurrentUser();
    if (!user) return fail();
    return NextResponse.redirect(`${origin}${isMiembro(user.estado) ? "/" : "/puzzle"}`);
  }

  // GitHub o Supabase devuelven ?error=... si el usuario cancela o falla el trigger.
  const code = searchParams.get("code");
  if (!code || searchParams.has("error")) {
    console.error("[auth/callback]", searchParams.get("error_description") ?? "sin código");
    return fail();
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) {
    console.error("[auth/callback]", error?.message);
    return fail();
  }

  // Mismo cliente: ya tiene la sesión nueva (las cookies de la request aún no).
  const { data: perfil } = await supabase
    .from("perfiles")
    .select("estado")
    .eq("id", data.user.id)
    .maybeSingle();
  if (!perfil) return fail();

  return NextResponse.redirect(`${origin}${isMiembro(perfil.estado) ? "/" : "/puzzle"}`);
}
