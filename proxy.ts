import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";
import { needsViewer, redirectFor } from "@/lib/auth/access";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isMockMode } from "@/lib/supabase/env";

/**
 * Antes de cada página (§5):
 * 1. Refresca la sesión de Supabase y reescribe sus cookies.
 * 2. Hace las redirecciones de acceso con un 307 real, antes de que empiece el streaming.
 * En modo mock no hace nada: la sesión simulada vive en memoria del servidor de páginas
 * y las redirecciones las hacen los guards de cada página.
 */
export async function proxy(request: NextRequest) {
  if (isMockMode) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        // La request actualizada llega a las páginas; la respuesta lleva las cookies al navegador.
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // getClaims valida el JWT (y lo refresca si venció). No meter código entre createServerClient y esto.
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  const { pathname } = request.nextUrl;
  if (!needsViewer(pathname)) return response;

  let viewer = null;
  if (userId) {
    const { data: perfil } = await supabase
      .from("perfiles")
      .select("estado, rol")
      .eq("id", userId)
      .maybeSingle();
    viewer = perfil;
  }

  const destino = redirectFor(pathname, viewer);
  if (!destino) return response;

  // 307 por defecto. Se copian las cookies refrescadas para no perder la sesión.
  const redirect = NextResponse.redirect(new URL(destino, request.url));
  response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}

export const config = {
  matcher: [
    // Todo menos estáticos, imágenes optimizadas, íconos y archivos de /public.
    "/((?!_next/static|_next/image|icon.svg|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
