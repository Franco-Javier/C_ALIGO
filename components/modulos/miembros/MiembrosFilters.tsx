import type { AreaCarrera, RolUsuario } from "@/types/database";
import { FilterChips } from "@/components/ui/FilterChips";
import { AREA_LABEL, ROL_LABEL } from "@/lib/labels";

type Filters = { area?: AreaCarrera; rol?: RolUsuario };

function miembrosHref({ area, rol }: Filters) {
  const params = new URLSearchParams();
  if (area) params.set("area", area);
  if (rol) params.set("rol", rol);
  const query = params.toString();
  return query ? `/miembros?${query}` : "/miembros";
}

/** Filtros por área y por rol; cada uno conserva el otro. */
export function MiembrosFilters({ area, rol }: Filters) {
  const areas = Object.keys(AREA_LABEL) as AreaCarrera[];
  const roles = Object.keys(ROL_LABEL) as RolUsuario[];

  return (
    <div className="flex flex-col gap-3">
      <FilterChips
        label="Área"
        chips={[
          { label: "Todas las áreas", href: miembrosHref({ rol }), active: !area },
          ...areas.map((a) => ({ label: AREA_LABEL[a], href: miembrosHref({ area: a, rol }), active: a === area })),
        ]}
      />
      <FilterChips
        label="Rol"
        chips={[
          { label: "Todos los roles", href: miembrosHref({ area }), active: !rol },
          ...roles.map((r) => ({ label: ROL_LABEL[r], href: miembrosHref({ area, rol: r }), active: r === rol })),
        ]}
      />
    </div>
  );
}
