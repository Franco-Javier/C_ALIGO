import { connection } from "next/server";
import { Plus } from "lucide-react";
import type { TipoEvento } from "@/types/database";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAsistenciasDePerfil, getEventos } from "@/lib/data/eventos";
import { getCurrentUser } from "@/lib/data/session";
import { TIPO_EVENTO_LABEL, isDirectiva, puedeVerReuniones, viewerOf } from "@/lib/labels";
import { AsistenciaControl } from "./AsistenciaControl";
import { EventoCard } from "./EventoCard";
import type { Cuando } from "./EventosFilters";

export async function EventosList({ tipo, cuando }: { tipo?: TipoEvento; cuando: Cuando }) {
  // Próximos/pasados depende de la hora actual.
  await connection();
  const user = await getCurrentUser();
  const viewer = viewerOf(user);
  const eventos = await getEventos({ tipo, cuando, incluirReuniones: puedeVerReuniones(viewer) });
  const mias = user && viewer === "miembro" ? await getAsistenciasDePerfil(user.id) : [];

  if (eventos.length === 0) {
    const tipoTexto = tipo ? ` de tipo ${TIPO_EVENTO_LABEL[tipo].toLowerCase()}` : "";
    return (
      <EmptyState
        message={`Aún no hay eventos ${cuando === "proximos" ? "próximos" : "pasados"}${tipoTexto}`}
        action={
          isDirectiva(user?.rol) && (
            <ButtonLink href="/admin/eventos" size="sm">
              <Plus className="size-4" aria-hidden /> Nuevo evento
            </ButtonLink>
          )
        }
      />
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {eventos.map((evento) => (
        <li key={evento.id} className="flex *:flex-1">
          <EventoCard
            evento={evento}
            footer={
              <AsistenciaControl
                eventoId={evento.id}
                viewer={viewer}
                proximo={cuando === "proximos"}
                asistire={mias.includes(evento.id)}
                count={evento.asistentes_count}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
}
