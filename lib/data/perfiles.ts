import type { AreaCarrera, Perfil, RolUsuario } from "@/types/database";
import { MOCK_PERFILES } from "@/lib/mock";
import { createClient } from "@/lib/supabase/server";
import { isMockMode, throwIfError } from "./shared";

type MiembrosFilter = { area?: AreaCarrera; rol?: RolUsuario };

/** Miembros visibles en /miembros: todos menos los pendientes. */
export async function getMiembros(filter: MiembrosFilter = {}): Promise<Perfil[]> {
  if (isMockMode) {
    return MOCK_PERFILES.filter(
      (p) =>
        p.estado !== "pendiente" &&
        (!filter.area || p.area === filter.area) &&
        (!filter.rol || p.rol === filter.rol),
    ).sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }

  const supabase = await createClient();
  let query = supabase.from("perfiles").select("*").neq("estado", "pendiente");
  if (filter.area) query = query.eq("area", filter.area);
  if (filter.rol) query = query.eq("rol", filter.rol);

  const { data, error } = await query.order("nombre");
  throwIfError(error, "getMiembros");
  return data ?? [];
}

export async function getPerfilByUsuario(usuario: string): Promise<Perfil | null> {
  if (isMockMode) {
    const lower = usuario.toLowerCase();
    return MOCK_PERFILES.find((p) => p.usuario_github?.toLowerCase() === lower) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("perfiles")
    .select("*")
    .ilike("usuario_github", usuario)
    .maybeSingle();
  throwIfError(error, "getPerfilByUsuario");
  return data;
}
