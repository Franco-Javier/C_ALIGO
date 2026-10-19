import { ArrowUpRight, FileText, GraduationCap, Link2, PlayCircle, type LucideIcon } from "lucide-react";
import type { MaterialConAutor, TipoMaterial } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { TIPO_MATERIAL_LABEL } from "@/lib/labels";
import { formatDate } from "@/lib/utils";

const ICON: Record<TipoMaterial, LucideIcon> = {
  link: Link2,
  documento: FileText,
  video: PlayCircle,
  curso: GraduationCap,
};

export function MaterialCard({ material }: { material: MaterialConAutor }) {
  const Icon = ICON[material.tipo];
  return (
    <Card className="flex gap-4 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display font-semibold leading-snug">{material.titulo}</h3>
          <Badge>{TIPO_MATERIAL_LABEL[material.tipo]}</Badge>
        </div>
        {material.descripcion && <p className="text-sm text-text-muted">{material.descripcion}</p>}
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-text-muted">
          {material.tema && <Tag>{material.tema}</Tag>}
          {material.autor && (
            <span>subido por @{material.autor.usuario_github ?? material.autor.nombre}</span>
          )}
          {material.creado_en && <span>· {formatDate(material.creado_en)}</span>}
        </p>
        <a
          href={material.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "secondary", size: "sm", className: "mt-1 self-start" })}
        >
          Abrir <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">(abre en una pestaña nueva)</span>
        </a>
      </div>
    </Card>
  );
}
