import Link from "next/link";
import type { ReactNode } from "react";
import type { PerfilResumen } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";

type PerfilLinkProps = {
  perfil: PerfilResumen;
  /** Texto bajo el nombre; por defecto el @usuario de GitHub. */
  detail?: ReactNode;
};

/** (av) Nombre / @usuario, enlazado al perfil público si tiene usuario de GitHub. */
export function PerfilLink({ perfil, detail }: PerfilLinkProps) {
  const content = (
    <>
      <Avatar name={perfil.nombre} src={perfil.avatar_url} size="sm" />
      <span className="min-w-0">
        <span className="block truncate text-sm">{perfil.nombre}</span>
        {detail ? (
          <span className="block truncate text-xs text-text-muted">{detail}</span>
        ) : (
          perfil.usuario_github && (
            <span className="block truncate font-mono text-xs text-primary">@{perfil.usuario_github}</span>
          )
        )}
      </span>
    </>
  );

  if (!perfil.usuario_github) return <div className="flex items-center gap-3 p-1.5">{content}</div>;
  return (
    <Link
      href={`/perfil/${perfil.usuario_github}`}
      className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-surface-2"
    >
      {content}
    </Link>
  );
}
