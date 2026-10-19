"use client";

import type { Perfil } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, RolBadge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Input";
import { updateMiembro } from "@/lib/actions/admin/miembros";
import { AREA_LABEL, ESTADO_USUARIO_LABEL, ROL_LABEL } from "@/lib/labels";
import { formatDate } from "@/lib/utils";
import { CrudManager } from "./CrudManager";

const options = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));
const ESTADO_TONE = { activo: "primary", pendiente: "warning", inactivo: "neutral" } as const;

function MiembroForm({ perfil, esYo }: { perfil: Perfil; esYo: boolean }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar name={perfil.nombre} src={perfil.avatar_url} size="md" />
        <span>
          <span className="block font-medium">{perfil.nombre}</span>
          <span className="block font-mono text-xs text-primary">@{perfil.usuario_github}</span>
        </span>
      </div>
      <Select label="Rol" name="rol" options={options(ROL_LABEL)} defaultValue={perfil.rol} required />
      <Select label="Área" name="area" options={options(AREA_LABEL)} defaultValue={perfil.area ?? ""} placeholder="Sin área" />
      <Select
        label="Estado"
        name="estado"
        options={options(ESTADO_USUARIO_LABEL)}
        defaultValue={perfil.estado}
        required
        hint={esYo ? "No puedes cambiar tu propio rol ni estado." : "Para reactivar a alguien, cámbialo a Activo."}
      />
    </>
  );
}

export function MiembrosAdmin({ perfiles, userId }: { perfiles: Perfil[]; userId: string }) {
  return (
    <CrudManager
      entity="miembro"
      rows={perfiles}
      allowCreate={false}
      save={updateMiembro}
      renderForm={(p) => p && <MiembroForm perfil={p} esYo={p.id === userId} />}
      columns={[
        {
          header: "Miembro",
          cell: (p) => (
            <span className="flex items-center gap-2">
              <Avatar name={p.nombre} src={p.avatar_url} size="xs" />
              <span className="min-w-0">
                <span className="block truncate">{p.nombre}</span>
                <span className="block font-mono text-xs text-primary">@{p.usuario_github}</span>
              </span>
            </span>
          ),
        },
        { header: "Rol", cell: (p) => <RolBadge rol={p.rol} /> },
        { header: "Área", className: "text-xs", cell: (p) => (p.area ? AREA_LABEL[p.area] : "—") },
        { header: "Estado", cell: (p) => <Badge tone={ESTADO_TONE[p.estado]}>{ESTADO_USUARIO_LABEL[p.estado]}</Badge> },
        {
          header: "Última actividad",
          className: "whitespace-nowrap font-mono text-xs text-text-muted",
          cell: (p) => (p.ultima_actividad ? formatDate(p.ultima_actividad) : "—"),
        },
      ]}
    />
  );
}
