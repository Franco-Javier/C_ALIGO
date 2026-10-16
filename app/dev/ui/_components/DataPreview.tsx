import Image from "next/image";
import { GitFork, MapPin } from "lucide-react";
import { AvatarGroup } from "@/components/ui/Avatar";
import { Badge, EstadoProyectoBadge, RolBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getEventos } from "@/lib/data/eventos";
import { getMiembros } from "@/lib/data/perfiles";
import { getProyectos } from "@/lib/data/proyectos";
import { isMockMode } from "@/lib/data/shared";
import { AREA_LABEL, TIPO_EVENTO_LABEL } from "@/lib/labels";
import { dateParts, formatTime } from "@/lib/utils";

/** Vista previa con datos reales de lib/data, para comprobar mocks y tipos. */
export async function DataPreview() {
  const [proyectos, eventos, miembros] = await Promise.all([
    getProyectos({ estado: "en_progreso" }),
    getEventos({ tipo: "workshop" }),
    getMiembros(),
  ]);
  const evento = eventos[0];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-xs text-text-muted">
        fuente: <span className="text-primary">{isMockMode ? "mock" : "supabase"}</span> ·{" "}
        {miembros.length} miembros visibles
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {proyectos.map((p) => (
          <Card key={p.id} interactive className="overflow-hidden">
            {p.imagen_url && (
              <Image src={p.imagen_url} alt={p.nombre} width={800} height={450} className="aspect-video w-full object-cover" />
            )}
            <div className="flex flex-col gap-2 p-4">
              <h3 className="font-display font-semibold">{p.nombre}</h3>
              <div>
                <EstadoProyectoBadge estado={p.estado} />
              </div>
              <p className="text-sm text-text-muted">{p.descripcion}</p>
              <div className="mt-1 flex items-center justify-between">
                <AvatarGroup people={p.miembros.map((m) => m.perfil)} />
                {p.repo_github && (
                  <span className="flex items-center gap-1 font-mono text-xs text-text-muted">
                    <GitFork className="size-3.5" aria-hidden /> repo
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {evento && (
        <Card interactive className="flex gap-4 p-4">
          <div className="flex w-14 shrink-0 flex-col items-center justify-center border-r border-border pr-4 font-mono">
            <span className="text-xl font-bold text-primary">{dateParts(evento.fecha_inicio).dia}</span>
            <span className="text-xs">{dateParts(evento.fecha_inicio).mes}</span>
            <span className="text-[10px] text-text-muted">{dateParts(evento.fecha_inicio).semana}</span>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display font-semibold">{evento.titulo}</h3>
              <Badge>{TIPO_EVENTO_LABEL[evento.tipo]}</Badge>
            </div>
            <p className="flex items-center gap-1 text-sm text-text-muted">
              <MapPin className="size-3.5" aria-hidden /> {evento.lugar} · {formatTime(evento.fecha_inicio)}
            </p>
            {evento.validado_utp && <Badge tone="primary">✔ Validado UTP</Badge>}
          </div>
        </Card>
      )}

      <ul className="flex flex-wrap gap-2">
        {miembros.map((m) => (
          <li key={m.id} className={m.estado === "inactivo" ? "opacity-50" : undefined}>
            <Card className="flex items-center gap-2 px-3 py-2 text-sm">
              <span>{m.nombre}</span>
              <span className="font-mono text-xs text-primary">@{m.usuario_github}</span>
              <RolBadge rol={m.rol} />
              {m.area && <span className="text-xs text-text-muted">{AREA_LABEL[m.area]}</span>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
