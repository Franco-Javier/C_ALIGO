import type { TipoEvento } from "@/types/database";
import { FilterChips } from "@/components/ui/FilterChips";
import { TIPO_EVENTO_LABEL, tiposEventoFiltro } from "@/lib/labels";

export type Cuando = "proximos" | "pasados";

export function eventosHref({ tipo, cuando }: { tipo?: TipoEvento; cuando: Cuando }) {
  const params = new URLSearchParams();
  if (tipo) params.set("tipo", tipo);
  if (cuando === "pasados") params.set("cuando", "pasados");
  const query = params.toString();
  return query ? `/eventos?${query}` : "/eventos";
}

type EventosFiltersProps = {
  tipo?: TipoEvento;
  cuando: Cuando;
  /** Solo miembros: agrega el chip "Reunión". */
  conReuniones: boolean;
};

/** [Todos] [Workshop] ... y ( Próximos | Pasados ). Cada filtro conserva el otro. */
export function EventosFilters({ tipo, cuando, conReuniones }: EventosFiltersProps) {
  const tipoChips = [
    { label: "Todos", href: eventosHref({ cuando }), active: !tipo },
    ...tiposEventoFiltro(conReuniones).map((t) => ({
      label: TIPO_EVENTO_LABEL[t],
      href: eventosHref({ tipo: t, cuando }),
      active: t === tipo,
    })),
  ];
  const cuandoChips = (["proximos", "pasados"] as const).map((c) => ({
    label: c === "proximos" ? "Próximos" : "Pasados",
    href: eventosHref({ tipo, cuando: c }),
    active: c === cuando,
  }));

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <FilterChips label="Tipo de evento" chips={tipoChips} />
      <FilterChips label="Periodo" chips={cuandoChips} />
    </div>
  );
}
