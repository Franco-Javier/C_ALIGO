"use client";

import type { EventoConAsistentes } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { deleteEvento, saveEvento } from "@/lib/actions/admin/eventos";
import { TIPO_EVENTO_LABEL } from "@/lib/labels";
import { formatDate, formatTime, toDateTimeLocal } from "@/lib/utils";
import { CrudManager } from "./CrudManager";

const TIPOS = Object.entries(TIPO_EVENTO_LABEL).map(([value, label]) => ({ value, label }));

function EventoForm({ evento }: { evento: EventoConAsistentes | null }) {
  return (
    <>
      <Input label="Título" name="titulo" defaultValue={evento?.titulo} required maxLength={150} />
      <Select label="Tipo" name="tipo" options={TIPOS} defaultValue={evento?.tipo ?? "workshop"} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Inicio"
          name="fecha_inicio"
          type="datetime-local"
          defaultValue={toDateTimeLocal(evento?.fecha_inicio)}
          required
        />
        <Input label="Fin" name="fecha_fin" type="datetime-local" defaultValue={toDateTimeLocal(evento?.fecha_fin)} />
      </div>
      <Input label="Lugar" name="lugar" defaultValue={evento?.lugar ?? ""} maxLength={150} placeholder="Aula 3, UTP Coclé" />
      <Textarea label="Descripción" name="descripcion" defaultValue={evento?.descripcion ?? ""} maxLength={2000} />
      <Checkbox label="Validado por UTP" name="validado_utp" defaultChecked={evento?.validado_utp ?? false} />
      <p className="font-mono text-xs text-text-muted">{"// Horas en hora de Panamá. Las reuniones solo las ven los miembros."}</p>
    </>
  );
}

export function EventosAdmin({ eventos }: { eventos: EventoConAsistentes[] }) {
  return (
    <CrudManager
      entity="evento"
      rows={eventos}
      save={saveEvento}
      remove={deleteEvento}
      deleteMessage={(e) => `Se eliminará "${e.titulo}" y sus asistencias. Sus evidencias se conservan sin evento.`}
      renderForm={(e) => <EventoForm evento={e} />}
      modalSize="lg"
      columns={[
        {
          header: "Fecha",
          className: "whitespace-nowrap font-mono text-xs",
          cell: (e) => `${formatDate(e.fecha_inicio)} · ${formatTime(e.fecha_inicio)}`,
        },
        { header: "Título", cell: (e) => <span className="font-medium">{e.titulo}</span> },
        { header: "Tipo", cell: (e) => <Badge>{TIPO_EVENTO_LABEL[e.tipo]}</Badge> },
        {
          header: "UTP",
          cell: (e) => (e.validado_utp ? <Badge tone="primary">✔ Validado</Badge> : <span className="text-text-muted">—</span>),
        },
        { header: "Asistentes", className: "font-mono text-xs", cell: (e) => e.asistentes_count },
      ]}
    />
  );
}
