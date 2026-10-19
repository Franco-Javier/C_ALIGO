"use client";

import type { Foro } from "@/types/database";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { deleteForo, saveForo } from "@/lib/actions/admin/foros";
import { CrudManager } from "./CrudManager";

function ForoForm({ foro, foros }: { foro: Foro | null; foros: Foro[] }) {
  const padres = foros
    .filter((f) => !f.foro_padre_id && f.id !== foro?.id)
    .map((f) => ({ value: f.id, label: `#${f.nombre}` }));

  return (
    <>
      <Input label="Nombre" name="nombre" defaultValue={foro?.nombre} required maxLength={60} />
      <Textarea label="Descripción" name="descripcion" rows={2} defaultValue={foro?.descripcion ?? ""} maxLength={200} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Foro padre"
          name="foro_padre_id"
          options={padres}
          defaultValue={foro?.foro_padre_id ?? ""}
          placeholder="Ninguno (foro general)"
          hint="Elige uno para crear un subforo."
        />
        <Input label="Orden" name="orden" type="number" min={0} max={999} defaultValue={foro?.orden ?? 0} />
      </div>
    </>
  );
}

/** Foros generales seguidos de sus subforos, en el orden en que se muestran. */
function enOrden(foros: Foro[]) {
  return foros
    .filter((f) => !f.foro_padre_id)
    .flatMap((f) => [f, ...foros.filter((s) => s.foro_padre_id === f.id)]);
}

export function ForosAdmin({ foros }: { foros: Foro[] }) {
  return (
    <CrudManager
      entity="foro"
      rows={enOrden(foros)}
      save={saveForo}
      remove={deleteForo}
      deleteMessage={(f) => `Se eliminará #${f.nombre} con sus subforos, hilos y mensajes. No se puede deshacer.`}
      renderForm={(f) => <ForoForm foro={f} foros={foros} />}
      columns={[
        {
          header: "Foro",
          cell: (f) => (
            <span className={f.foro_padre_id ? "pl-5 font-mono text-sm" : "font-mono text-sm font-medium"}>
              <span className="text-primary">{f.foro_padre_id ? "└ #" : "#"}</span>
              {f.nombre}
            </span>
          ),
        },
        { header: "Descripción", className: "text-xs text-text-muted", cell: (f) => f.descripcion ?? "—" },
        { header: "Orden", className: "font-mono text-xs", cell: (f) => f.orden ?? 0 },
      ]}
    />
  );
}
