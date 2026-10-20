import type { Herramienta } from "@/types/database";
import { MOCK_HERRAMIENTAS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

export async function getHerramientas(): Promise<Herramienta[]> {
  if (isMockMode) {
    return [...MOCK_HERRAMIENTAS].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("herramientas").select("*").order("orden");
  throwIfError(error, "getHerramientas");
  return data ?? [];
}

