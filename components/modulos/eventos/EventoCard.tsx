import Link from "next/link";
import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import type { Evento } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { cardStyles } from "@/components/ui/Card";
import { TIPO_EVENTO_LABEL } from "@/lib/labels";
import { dateParts, formatTime } from "@/lib/utils";

type EventoCardProps = {
  evento: Evento;
  /** Acciones bajo el contenido (ej. "Asistiré"). Quedan por encima del enlace de la tarjeta. */
  footer?: ReactNode;
};

/** Tarjeta de evento (§7.4): bloque de fecha + título, tipo, lugar y hora. */
export function EventoCard({ evento, footer }: EventoCardProps) {
  const { dia, mes, semana } = dateParts(evento.fecha_inicio);

  return (
    <article className={cardStyles({ interactive: true, className: "relative flex gap-4 p-4" })}>
      <div className="flex w-14 shrink-0 flex-col items-center justify-center border-r border-border pr-4 font-mono">
        <span className="text-2xl font-bold leading-none text-primary">{dia}</span>
        <span className="mt-1 text-xs">{mes}</span>
        <span className="text-[10px] text-text-muted">{semana}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          <Badge>{TIPO_EVENTO_LABEL[evento.tipo]}</Badge>
          {evento.validado_utp && <Badge tone="primary">✔ Validado UTP</Badge>}
        </div>
        <h3 className="font-display font-semibold leading-snug">
          {/* El ::after estira el enlace a toda la tarjeta */}
          <Link href={`/eventos/${evento.id}`} className="rounded after:absolute after:inset-0 after:rounded-xl">
            {evento.titulo}
          </Link>
        </h3>
        <p className="flex items-start gap-1 text-sm text-text-muted">
          <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>
            {evento.lugar && `${evento.lugar} · `}
            {formatTime(evento.fecha_inicio)}
          </span>
        </p>
        {footer && <div className="relative z-10 mt-auto pt-2">{footer}</div>}
      </div>
    </article>
  );
}
