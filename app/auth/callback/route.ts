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

  if (!isMockMode) {
    const code = searchParams.get("code");
    if (!code) return NextResponse.redirect(`${origin}/login?error=oauth`);

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${origin}/login?error=oauth`);
  }

  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(`${origin}/login?error=oauth`);
  return NextResponse.redirect(`${origin}${isMiembro(user.estado) ? "/" : "/puzzle"}`);
}
