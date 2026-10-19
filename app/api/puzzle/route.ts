import { NextResponse, type NextRequest } from "next/server";
import type { ActionResult } from "@/lib/actions/types";
import { getCurrentUser } from "@/lib/data/session";
import { MOCK_PERFILES } from "@/lib/mock";
import { MOCK_PUZZLE_RESPUESTA } from "@/lib/mock/puzzle";
import { normalizeRespuesta } from "@/lib/puzzle";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMockMode } from "@/lib/supabase/env";

const json = (body: ActionResult, status = 200) => NextResponse.json(body, { status });

/**
 * Valida la respuesta del reto (§7.3). Si es correcta, el perfil pasa de
 * `pendiente` a `activo` con el cliente admin (el trigger impide que el
 * usuario cambie su propio estado). El cliente luego va a /perfil/editar.
 */
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return json({ ok: false, error: "Inicia sesión para continuar" }, 401);
  if (user.estado !== "pendiente") return json({ ok: true });

  const body: unknown = await request.json().catch(() => null);
  const respuesta =
    body && typeof body === "object" && "respuesta" in body && typeof body.respuesta === "string"
      ? body.respuesta
      : "";

  const esperada = process.env.PUZZLE_RESPUESTA || (isMockMode ? MOCK_PUZZLE_RESPUESTA : "");
  if (!esperada) return json({ ok: false, error: "El reto no está configurado" }, 500);

  // Mensaje genérico: nunca se revela la respuesta ni qué parte falló.
  if (!respuesta || normalizeRespuesta(respuesta) !== normalizeRespuesta(esperada)) {
    return json({ ok: false, error: "Incorrecto, intenta de nuevo" });
  }

  const cambios = { estado: "activo" as const, puzzle_resuelto_en: new Date().toISOString() };

  if (isMockMode) {
    const perfil = MOCK_PERFILES.find((p) => p.id === user.id);
    if (perfil) Object.assign(perfil, cambios);
    return json({ ok: true });
  }

  const { error } = await createAdminClient().from("perfiles").update(cambios).eq("id", user.id);
  if (error) return json({ ok: false, error: "No se pudo activar tu cuenta" }, 500);
  return json({ ok: true });
}
