import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";
import type { Database } from "@/types/database";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

/** Cliente para Server Components, Server Actions y Route Handlers. */
export async function createClient() {
  // Supabase usa Date.now() al validar la sesión. Con Cache Components, cookies() ya se
  // resuelve en el prerender del App Shell y eso da "unstable value Date.now()".
  // connection() deja todo el cliente en tiempo de petición (sigue dentro de <Suspense>).
  await connection();
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Llamado desde un Server Component: no se pueden escribir cookies.
          // El middleware/proxy se encarga de refrescar la sesión.
        }
      },
    },
  });
}
