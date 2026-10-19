import { Search } from "lucide-react";
import type { TipoMaterial } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { FilterChips } from "@/components/ui/FilterChips";
import { Input, Select } from "@/components/ui/Input";
import { TIPO_MATERIAL_LABEL } from "@/lib/labels";

type Filters = { q?: string; tema?: string; tipo?: TipoMaterial };

function materialesHref({ q, tema, tipo }: Filters) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (tema) params.set("tema", tema);
  if (tipo) params.set("tipo", tipo);
  const query = params.toString();
  return query ? `/materiales?${query}` : "/materiales";
}

/**
 * [Buscar...] Tema: [▾] [Buscar] como formulario GET (funciona sin JS),
 * y los tipos como chips que conservan la búsqueda y el tema.
 */
export function MaterialesFilters({ q, tema, tipo, temas }: Filters & { temas: string[] }) {
  const tipos = Object.keys(TIPO_MATERIAL_LABEL) as TipoMaterial[];

  return (
    <div className="flex flex-col gap-3">
      <form action="/materiales" className="grid gap-3 sm:grid-cols-[1fr_200px_auto] sm:items-end">
        <Input label="Buscar" hideLabel name="q" type="search" defaultValue={q} placeholder="Buscar por título..." />
        <Select
          label="Tema"
          hideLabel
          name="tema"
          defaultValue={tema ?? ""}
          placeholder="Todos los temas"
          options={temas.map((t) => ({ value: t, label: t }))}
        />
        {tipo && <input type="hidden" name="tipo" value={tipo} />}
        <Button type="submit" variant="secondary">
          <Search className="size-4" aria-hidden /> Buscar
        </Button>
      </form>
      <FilterChips
        label="Tipo de material"
        chips={[
          { label: "Todos", href: materialesHref({ q, tema }), active: !tipo },
          ...tipos.map((t) => ({
            label: TIPO_MATERIAL_LABEL[t],
            href: materialesHref({ q, tema, tipo: t }),
            active: t === tipo,
          })),
        ]}
      />
    </div>
  );
}
