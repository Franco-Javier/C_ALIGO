import Image from "next/image";
import type { ProyectoConEquipo } from "@/types/database";
import { PerfilLink } from "@/components/modulos/perfil/PerfilLink";
import { EstadoProyectoBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

/** Nombre, estado, responsable y descripción completa. */
export function ProyectoHeader({ proyecto }: { proyecto: ProyectoConEquipo }) {
  return (
    <Card className="overflow-hidden">
      {proyecto.imagen_url && (
        <div className="relative aspect-[3/1] bg-surface-2">
          <Image
            src={proyecto.imagen_url}
            alt={proyecto.nombre}
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{proyecto.nombre}</h1>
          <EstadoProyectoBadge estado={proyecto.estado} />
        </div>
        {proyecto.responsable && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-text-muted">Responsable:</span>
            <PerfilLink perfil={proyecto.responsable} />
          </div>
        )}
        {proyecto.descripcion ? (
          <p className="whitespace-pre-line leading-relaxed text-text/90">{proyecto.descripcion}</p>
        ) : (
          <p className="font-mono text-sm text-text-muted">{"// Sin descripción"}</p>
        )}
      </div>
    </Card>
  );
}
