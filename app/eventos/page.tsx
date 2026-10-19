import type { Metadata } from "next";
import { Suspense } from "react";
import { EventosFilters, type Cuando } from "@/components/modulos/eventos/EventosFilters";
import { EventosList } from "@/components/modulos/eventos/EventosList";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCurrentUser } from "@/lib/data/session";
import { parseTipoEvento, puedeVerReuniones, viewerOf } from "@/lib/labels";
import { EventosSkeleton } from "./EventosSkeleton";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Workshops, charlas, hackathons, giras y stands de C_ALIGO.",
};

async function EventosContent({ searchParams }: PageProps<"/eventos">) {
  const [params, user] = await Promise.all([searchParams, getCurrentUser()]);
  const conReuniones = puedeVerReuniones(viewerOf(user));
  const tipo = parseTipoEvento(params.tipo, conReuniones);
  const cuando: Cuando = params.cuando === "pasados" ? "pasados" : "proximos";

  return (
    <div className="flex flex-col gap-6">
      <EventosFilters tipo={tipo} cuando={cuando} conReuniones={conReuniones} />
      <EventosList tipo={tipo} cuando={cuando} />
    </div>
  );
}

export default function EventosPage(props: PageProps<"/eventos">) {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-6">
        Eventos
      </SectionTitle>
      <Suspense fallback={<EventosSkeleton />}>
        <EventosContent {...props} />
      </Suspense>
    </div>
  );
}
