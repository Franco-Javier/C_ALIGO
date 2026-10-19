import "server-only";
import { cookies } from "next/headers";
import type { Perfil } from "@/types/database";
import { MOCK_PERFILES, MOCK_USUARIO } from "./perfiles";

/**
 * Sesión simulada (solo modo mock). La cookie guarda el id del perfil con el que se
 * navega, o "anon" para ver la app como visitante. Sin cookie se usa MOCK_USUARIO.
 */
const COOKIE = "caligo_mock_session";
const ANON = "anon";

export async function getMockSession(): Promise<Perfil | null> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (value === ANON) return null;
  return MOCK_PERFILES.find((p) => p.id === value) ?? MOCK_USUARIO;
}

/** Solo en Server Actions o Route Handlers. `null` = cerrar sesión. */
export async function setMockSession(perfilId: string | null) {
  (await cookies()).set(COOKIE, perfilId ?? ANON, { path: "/", httpOnly: true, sameSite: "lax" });
}
