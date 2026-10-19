import { ArrowUpRight } from "lucide-react";
import type { Perfil } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, RolBadge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AREA_LABEL } from "@/lib/labels";

/** Avatar grande, nombre, @usuario, rol, carrera, área, bio y enlace a GitHub. */
export function PerfilHeader({ perfil }: { perfil: Perfil }) {
  return (
    <Card className="flex flex-col items-center gap-5 p-5 text-center sm:flex-row sm:items-start sm:p-6 sm:text-left">
      <Avatar name={perfil.nombre} src={perfil.avatar_url} size="xl" />
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:items-start">
        <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{perfil.nombre}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          {perfil.usuario_github && (
            <span className="font-mono text-sm text-primary">@{perfil.usuario_github}</span>
          )}
          <RolBadge rol={perfil.rol} />
          {perfil.estado === "inactivo" && <Badge tone="warning">Inactivo</Badge>}
        </div>
        {perfil.carrera && <p className="text-sm">{perfil.carrera}</p>}
        <p className="text-sm text-text-muted">
          Área: {perfil.area ? AREA_LABEL[perfil.area].toLowerCase() : "sin definir"}
        </p>
        {perfil.bio && <p className="max-w-prose whitespace-pre-line text-sm text-text/90">{perfil.bio}</p>}
        {perfil.usuario_github && (
          <a
            href={`https://github.com/${perfil.usuario_github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "secondary", size: "sm", className: "mt-2" })}
          >
            <GithubIcon className="size-4" /> GitHub <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(abre en una pestaña nueva)</span>
          </a>
        )}
      </div>
    </Card>
  );
}
