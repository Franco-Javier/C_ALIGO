import type { Noticia } from "@/types/database";
import { MOCK_NOTICIAS } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

export const NOTICIAS_POR_PAGINA = 20;

/** Página 1-indexada, más recientes primero. */
export async function getNoticias(
  { page = 1, pageSize = NOTICIAS_POR_PAGINA }: { page?: number; pageSize?: number } = {},
): Promise<{ items: Noticia[]; total: number }> {
  const from = (page - 1) * pageSize;

  if (isMockMode) {
    const sorted = [...MOCK_NOTICIAS].sort((a, b) =>
      (b.publicado_en ?? "").localeCompare(a.publicado_en ?? ""),
    );
    return { items: sorted.slice(from, from + pageSize), total: sorted.length };
  }

  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("noticias")
    .select("*", { count: "exact" })
    .order("publicado_en", { ascending: false })
    .range(from, from + pageSize - 1);
  throwIfError(error, "getNoticias");
  return { items: data ?? [], total: count ?? 0 };
}
