"use client";

import type { Herramienta } from "@/types/database";
import { Input, Textarea } from "@/components/ui/Input";
import { deleteHerramienta, saveHerramienta } from "@/lib/actions/admin/herramientas";
import { CrudManager } from "./CrudManager";

function HerramientaForm({ herramienta, categorias }: { herramienta: Herramienta | null; categorias: string[] }) {
  return (
    <>
      <Input label="Nombre" name="nombre" defaultValue={herramienta?.nombre} required maxLength={60} />
      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <Input
          label="Categoría"
          name="categoria"
          list="categorias-herramientas"
          defaultValue={herramienta?.categoria ?? ""}
          placeholder="Editor, Diseño..."
          maxLength={40}
        />
        <Input label="Orden" name="orden" type="number" min={0} max={999} defaultValue={herramienta?.orden ?? 0} />
      </div>
      <datalist id="categorias-herramientas">
        {categorias.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <Input label="Enlace de descarga" name="url_descarga" type="url" defaultValue={herramienta?.url_descarga} required placeholder="https://..." />
      <Input label="Ícono (URL)" name="icono_url" defaultValue={herramienta?.icono_url ?? ""} placeholder="https://.../icono.svg" />
      <Textarea label="Descripción" name="descripcion" rows={2} defaultValue={herramienta?.descripcion ?? ""} maxLength={200} />
    </>
  );
}

export function HerramientasAdmin({ herramientas }: { herramientas: Herramienta[] }) {
  const categorias = [...new Set(herramientas.map((h) => h.categoria).filter((c): c is string => !!c))];

  return (
    <CrudManager
      entity="herramienta"
      feminine
      rows={herramientas}
      save={saveHerramienta}
      remove={deleteHerramienta}
      deleteMessage={(h) => `Se quitará ${h.nombre} de /herramientas.`}
      renderForm={(h) => <HerramientaForm herramienta={h} categorias={categorias} />}
      columns={[
        { header: "Orden", className: "w-px font-mono text-xs", cell: (h) => h.orden ?? 0 },
        { header: "Nombre", cell: (h) => <span className="font-medium">{h.nombre}</span> },
        { header: "Categoría", className: "text-xs text-text-muted", cell: (h) => h.categoria ?? "—" },
        {
          header: "Descarga",
          className: "max-w-56 truncate font-mono text-xs text-text-muted",
          cell: (h) => h.url_descarga.replace(/^https?:\/\//, ""),
        },
      ]}
    />
  );
}
