import type { ReactNode } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Evento } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TIPO_EVENTO_LABEL } from "@/lib/labels";
import { formatDateLong, formatTimeRange } from "@/lib/utils";

function Meta({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-text-muted">
      <span className="mt-0.5 text-primary">{icon}</span>
      <span className="first-letter:uppercase">{children}</span>
    </li>
  );
}

/** Cabecera del detalle: tipo, título, fecha, horario, lugar y la acción de asistencia. */
export function EventoHeader({ evento, action }: { evento: Evento; action: ReactNode }) {
  return (
    <Card className="flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-wrap gap-1.5">
        <Badge>{TIPO_EVENTO_LABEL[evento.tipo]}</Badge>
        {evento.validado_utp && <Badge tone="primary">✔ Validado UTP</Badge>}
      </div>
      <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{evento.titulo}</h1>
      <ul className="flex flex-col gap-2">
        <Meta icon={<Calendar className="size-4" aria-hidden />}>
          {formatDateLong(evento.fecha_inicio)}
        </Meta>
        <Meta icon={<Clock className="size-4" aria-hidden />}>
          {formatTimeRange(evento.fecha_inicio, evento.fecha_fin)}
        </Meta>
        {evento.lugar && <Meta icon={<MapPin className="size-4" aria-hidden />}>{evento.lugar}</Meta>}
      </ul>
      <div>{action}</div>
    </Card>
  );
}
