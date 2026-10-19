"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import type { ProyectoConEquipo } from "@/types/database";
import { AvatarGroup } from "@/components/ui/Avatar";
import { EstadoProyectoBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { deleteProyecto, saveProyecto } from "@/lib/actions/admin/proyectos";
import { ESTADO_PROYECTO_LABEL } from "@/lib/labels";
import { CrudManager } from "./CrudManager";
import { EquipoModal } from "./EquipoModal";

type Option = { value: string; label: string };
const ESTADOS = Object.entries(ESTADO_PROYECTO_LABEL).map(([value, label]) => ({ value, label }));

function ProyectoForm({ proyecto, miembros }: { proyecto: ProyectoConEquipo | null; miembros: Option[] }) {
  return (
    <>
      <Input label="Nombre" name="nombre" defaultValue={proyecto?.nombre} required maxLength={120} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Estado" name="estado" options={ESTADOS} defaultValue={proyecto?.estado ?? "idea"} required />
        <Select
          label="Responsable"
          name="responsable_id"
          options={miembros}
          defaultValue={proyecto?.responsable_id ?? ""}
          placeholder="Sin responsable"
        />
      </div>
      <Input
        label="Repositorio de GitHub"
        name="repo_github"
        defaultValue={proyecto?.repo_github ?? ""}
        placeholder="usuario/repositorio"
        className="font-mono"
      />
      <Input
        label="Imagen"
        name="imagen_url"
        defaultValue={proyecto?.imagen_url ?? ""}
        placeholder="/mock/proyecto-1.svg"
        hint="Ruta local o URL de Supabase Storage."
      />
      <Textarea label="Descripción" name="descripcion" defaultValue={proyecto?.descripcion ?? ""} maxLength={2000} />
    </>
  );
}

export function ProyectosAdmin({ proyectos, miembros }: { proyectos: ProyectoConEquipo[]; miembros: Option[] }) {
  const [equipoDe, setEquipoDe] = useState<string | null>(null);
  // Se busca en `proyectos` para que el modal se actualice tras cada cambio.
  const proyectoEquipo = proyectos.find((p) => p.id === equipoDe) ?? null;

  return (
    <>
      <CrudManager
        entity="proyecto"
        rows={proyectos}
        save={saveProyecto}
        remove={deleteProyecto}
        deleteMessage={(p) => `Se eliminará "${p.nombre}" y su equipo. Sus badges y evidencias se conservan.`}
        renderForm={(p) => <ProyectoForm proyecto={p} miembros={miembros} />}
        modalSize="lg"
        rowActions={(p) => (
          <Button size="sm" variant="ghost" onClick={() => setEquipoDe(p.id)} aria-label={`Equipo de ${p.nombre}`}>
            <Users className="size-4" aria-hidden />
          </Button>
        )}
        columns={[
          { header: "Nombre", cell: (p) => <span className="font-medium">{p.nombre}</span> },
          { header: "Estado", cell: (p) => <EstadoProyectoBadge estado={p.estado} /> },
          { header: "Responsable", className: "text-xs", cell: (p) => p.responsable?.nombre ?? "—" },
          { header: "Equipo", cell: (p) => <AvatarGroup people={p.miembros.map((m) => m.perfil)} size="xs" /> },
          { header: "Repo", className: "font-mono text-xs text-text-muted", cell: (p) => p.repo_github ?? "—" },
        ]}
      />
      <EquipoModal proyecto={proyectoEquipo} miembros={miembros} onClose={() => setEquipoDe(null)} />
    </>
  );
}
