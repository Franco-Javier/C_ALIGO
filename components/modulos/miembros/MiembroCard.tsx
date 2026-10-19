import Link from "next/link";
import type { Perfil } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, RolBadge } from "@/components/ui/Badge";
import { cardStyles } from "@/components/ui/Card";
import { AREA_LABEL } from "@/lib/labels";
import { cn } from "@/lib/utils";

/** Tarjeta de /miembros. Los inactivos se ven atenuados con la etiqueta "inactivo". */
export function MiembroCard({ perfil }: { perfil: Perfil }) {
  const inactivo = perfil.estado === "inactivo";
  const body = (
    <>
      <Avatar name={perfil.nombre} src={perfil.avatar_url} size="lg" />
      <div className="flex min-w-0 flex-col items-center gap-1">
        <span className="max-w-full truncate font-display font-semibold">{perfil.nombre}</span>
        {perfil.usuario_github && (
          <span className="max-w-full truncate font-mono text-xs text-primary">@{perfil.usuario_github}</span>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        <RolBadge rol={perfil.rol} />
        {inactivo && <Badge tone="warning">Inactivo</Badge>}
      </div>
      <span className="text-xs text-text-muted">
        {perfil.area ? AREA_LABEL[perfil.area] : "Área sin definir"}
      </span>
    </>
  );
  const className = cardStyles({
    interactive: !!perfil.usuario_github,
    className: cn("flex h-full flex-col items-center gap-3 p-5 text-center", inactivo && "opacity-60"),
  });

  if (!perfil.usuario_github) return <div className={className}>{body}</div>;
  return (
    <Link href={`/perfil/${perfil.usuario_github}`} className={className}>
      {body}
    </Link>
  );
}
