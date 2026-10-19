"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { Evidencia } from "@/types/database";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { deleteEvidencia, saveEvidencia } from "@/lib/actions/admin/evidencias";
import { formatDate } from "@/lib/utils";
import { CrudManager } from "./CrudManager";

type Option = { value: string; label: string };
type EvidenciasAdminProps = { evidencias: Evidencia[]; eventos: Option[]; proyectos: Option[] };

const hoy = () => new Date().toISOString().slice(0, 10);

function EvidenciaForm({ evidencia, eventos, proyectos }: { evidencia: Evidencia | null } & Omit<EvidenciasAdminProps, "evidencias">) {
  return (
    <>
      <Input label="Título" name="titulo" defaultValue={evidencia?.titulo} required maxLength={150} />
      <Input label="Fecha" name="fecha" type="date" defaultValue={evidencia?.fecha ?? hoy()} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Evento vinculado" name="evento_id" options={eventos} defaultValue={evidencia?.evento_id ?? ""} placeholder="Sin evento" />
        <Select
          label="Proyecto vinculado"
          name="proyecto_id"
          options={proyectos}
          defaultValue={evidencia?.proyecto_id ?? ""}
          placeholder="Sin proyecto"
        />
      </div>
      <Textarea
        label="Fotos (una URL por línea)"
        name="fotos"
        rows={4}
        defaultValue={evidencia?.fotos?.join("\n") ?? ""}
        className="font-mono text-xs"
        hint="Rutas locales (/mock/evidencia-1.svg) o URLs de Supabase Storage. Pronto: subida múltiple con compresión."
      />
      <Textarea label="Descripción" name="descripcion" defaultValue={evidencia?.descripcion ?? ""} maxLength={2000} />
    </>
  );
}

export function EvidenciasAdmin({ evidencias, eventos, proyectos }: EvidenciasAdminProps) {
  const nombre = (options: Option[], id: string | null) => options.find((o) => o.value === id)?.label;

  return (
    <CrudManager
      entity="evidencia"
      feminine
      rows={evidencias}
      save={saveEvidencia}
      remove={deleteEvidencia}
      deleteMessage={(e) => `Se eliminará "${e.titulo}" de la página de Impacto.`}
      renderForm={(e) => <EvidenciaForm evidencia={e} eventos={eventos} proyectos={proyectos} />}
      modalSize="lg"
      columns={[
        {
          header: "Foto",
          cell: (e) =>
            e.fotos?.[0] ? (
              // unoptimized: en el admin la URL puede ser de cualquier origen.
              <Image src={e.fotos[0]} alt="" width={64} height={40} unoptimized className="h-10 w-16 rounded object-cover" />
            ) : (
              <ImageOff className="size-5 text-text-muted" aria-label="Sin fotos" />
            ),
        },
        { header: "Título", cell: (e) => <span className="font-medium">{e.titulo}</span> },
        { header: "Fecha", className: "whitespace-nowrap font-mono text-xs", cell: (e) => (e.fecha ? formatDate(e.fecha) : "—") },
        {
          header: "Vinculada a",
          className: "text-xs text-text-muted",
          cell: (e) => nombre(eventos, e.evento_id) ?? nombre(proyectos, e.proyecto_id) ?? "—",
        },
        { header: "Fotos", className: "font-mono text-xs", cell: (e) => e.fotos?.length ?? 0 },
      ]}
    />
  );
}
