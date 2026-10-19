import { connection } from "next/server";
import { EventoCard } from "@/components/modulos/eventos/EventoCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getEventos } from "@/lib/data/eventos";
import { getCurrentUser } from "@/lib/data/session";
import { puedeVerReuniones, viewerOf } from "@/lib/labels";

export async function ProximosEventosSection() {
  // "Próximos" depende de la hora actual: se calcula en cada request.
  await connection();
  const user = await getCurrentUser();
  const eventos = await getEventos({
    cuando: "proximos",
    incluirReuniones: puedeVerReuniones(viewerOf(user)),
    limit: 3,
  });

  if (eventos.length === 0) return <EmptyState message="Aún no hay eventos próximos" />;

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {eventos.map((evento) => (
        <li key={evento.id} className="flex *:flex-1">
          <EventoCard evento={evento} />
        </li>
      ))}
    </ul>
  );
}
