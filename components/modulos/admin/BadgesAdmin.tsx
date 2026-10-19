"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import { BadgeTile } from "@/components/modulos/badges/BadgeTile";
import { AvatarGroup } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { deleteBadge, saveBadge } from "@/lib/actions/admin/badges";
import type { BadgeConOtorgados } from "@/lib/data/badges";
import { CrudManager } from "./CrudManager";
import { OtorgarModal } from "./OtorgarModal";

type Option = { value: string; label: string };
type BadgesAdminProps = { badges: BadgeConOtorgados[]; miembros: Option[]; proyectos: Option[] };

function BadgeForm({ badge, proyectos }: { badge: BadgeConOtorgados | null; proyectos: Option[] }) {
  return (
    <>
      <Input label="Nombre" name="nombre" defaultValue={badge?.nombre} required maxLength={60} />
      <Textarea label="Descripción" name="descripcion" rows={2} defaultValue={badge?.descripcion ?? ""} maxLength={300} />
      <Input
        label="Ícono"
        name="icono_url"
        defaultValue={badge?.icono_url ?? ""}
        placeholder="/badges/fundador.svg"
        hint="Ruta local o URL de Supabase Storage. Sin ícono se usa una medalla genérica."
      />
      <Select
        label="Proyecto"
        name="proyecto_id"
        options={proyectos}
        defaultValue={badge?.proyecto_id ?? ""}
        placeholder="Sin proyecto"
        hint="Si es de un proyecto, aparece en su página."
      />
    </>
  );
}

export function BadgesAdmin({ badges, miembros, proyectos }: BadgesAdminProps) {
  const [otorgarId, setOtorgarId] = useState<string | null>(null);

  return (
    <>
      <CrudManager
        entity="badge"
        rows={badges}
        save={saveBadge}
        remove={deleteBadge}
        deleteMessage={(b) => `Se eliminará "${b.nombre}" y se les quitará a los ${b.otorgados.length} miembros que lo tienen.`}
        renderForm={(b) => <BadgeForm badge={b} proyectos={proyectos} />}
        rowActions={(b) => (
          <Button size="sm" variant="ghost" onClick={() => setOtorgarId(b.id)} aria-label={`Otorgar ${b.nombre}`}>
            <Gift className="size-4" aria-hidden />
          </Button>
        )}
        columns={[
          { header: "Badge", cell: (b) => <BadgeTile badge={b} className="max-w-xs border-0 bg-transparent p-0" /> },
          {
            header: "Proyecto",
            className: "text-xs text-text-muted",
            cell: (b) => proyectos.find((p) => p.value === b.proyecto_id)?.label ?? "—",
          },
          {
            header: "Otorgado a",
            cell: (b) =>
              b.otorgados.length ? (
                <AvatarGroup people={b.otorgados.map((o) => o.perfil)} size="xs" max={5} />
              ) : (
                <span className="text-text-muted">—</span>
              ),
          },
        ]}
      />
      <OtorgarModal
        badge={badges.find((b) => b.id === otorgarId) ?? null}
        miembros={miembros}
        onClose={() => setOtorgarId(null)}
      />
    </>
  );
}
