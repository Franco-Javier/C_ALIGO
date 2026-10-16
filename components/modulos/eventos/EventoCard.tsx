import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Evento } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { cardStyles } from "@/components/ui/Card";
import { TIPO_EVENTO_LABEL } from "@/lib/labels";
import { dateParts, formatTime } from "@/lib/utils";

/** Tarjeta de evento (§7.4): bloque de fecha + título, tipo, lugar y hora. */
export function EventoCard({ evento }: { evento: Evento }) {
  const { dia, mes, semana } = dateParts(evento.fecha_inicio);

  return (
    <Link
      href={`/eventos/${evento.id}`}
      className={cardStyles({ interactive: true, className: "flex gap-4 p-4" })}
    >
      <div className="flex w-14 shrink-0 flex-col items-center justify-center border-r border-border pr-4 font-mono">
        <span className="text-2xl font-bold leading-none text-primary">{dia}</span>
        <span className="mt-1 text-xs">{mes}</span>
        <span className="text-[10px] text-text-muted">{semana}</span>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <div>
          <Badge>{TIPO_EVENTO_LABEL[evento.tipo]}</Badge>
        </div>
        <h3 className="font-display font-semibold leading-snug">{evento.titulo}</h3>
        <p className="flex items-start gap-1 text-sm text-text-muted">
          <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>
            {evento.lugar && `${evento.lugar} · `}
            {formatTime(evento.fecha_inicio)}
          </span>
        </p>
        {evento.validado_utp && (
          <div>
            <Badge tone="primary">✔ Validado UTP</Badge>
          </div>
        )}
      </div>
    </Link>
  );
}
