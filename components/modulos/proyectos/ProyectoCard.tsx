import Image from "next/image";
import Link from "next/link";
import { GitFork, Terminal } from "lucide-react";
import type { ProyectoConEquipo } from "@/types/database";
import { AvatarGroup } from "@/components/ui/Avatar";
import { EstadoProyectoBadge } from "@/components/ui/Badge";
import { cardStyles } from "@/components/ui/Card";

/** Tarjeta de proyecto (§7.5). Las estrellas de GitHub llegan en la Fase 3. */
export function ProyectoCard({ proyecto }: { proyecto: ProyectoConEquipo }) {
  return (
    <Link
      href={`/proyectos/${proyecto.id}`}
      className={cardStyles({ interactive: true, className: "flex flex-col overflow-hidden" })}
    >
      <div className="relative aspect-video bg-surface-2">
        {proyecto.imagen_url ? (
          <Image
            src={proyecto.imagen_url}
            alt={proyecto.nombre}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-border">
            <Terminal className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display font-semibold leading-snug">{proyecto.nombre}</h3>
        <div>
          <EstadoProyectoBadge estado={proyecto.estado} />
        </div>
        {proyecto.descripcion && (
          <p className="line-clamp-2 text-sm text-text-muted">{proyecto.descripcion}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <AvatarGroup people={proyecto.miembros.map((m) => m.perfil)} />
          {proyecto.repo_github && (
            <span className="flex items-center gap-1 font-mono text-xs text-text-muted">
              <GitFork className="size-3.5" aria-hidden /> repo
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
