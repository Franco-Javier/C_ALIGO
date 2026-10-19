import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AsistenciaControl } from "@/components/modulos/eventos/AsistenciaControl";
import { AsistentesList } from "@/components/modulos/eventos/AsistentesList";
import { EventoHeader } from "@/components/modulos/eventos/EventoHeader";
import { EvidenciasGallery } from "@/components/modulos/evidencias/EvidenciasGallery";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getEventoById } from "@/lib/data/eventos";
import { getEvidencias } from "@/lib/data/evidencias";
import { getCurrentUser } from "@/lib/data/session";
import { puedeVerReuniones, viewerOf } from "@/lib/labels";
import { isUuid } from "@/lib/utils";
import { EventoDetalleSkeleton } from "./EventoDetalleSkeleton";

// Pendiente (Fase 4, SEO): generateMetadata con el título del evento.
export const metadata: Metadata = { title: "Evento" };

async function EventoDetalle({ params }: PageProps<"/eventos/[id]">) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  await connection(); // "próximo" depende de la hora actual
  const [evento, evidencias, user] = await Promise.all([
    getEventoById(id),
    getEvidencias({ eventoId: id }),
    getCurrentUser(),
  ]);
  const viewer = viewerOf(user);
  // Las reuniones son internas: para visitantes y pendientes "no existen".
  if (!evento || (evento.tipo === "reunion" && !puedeVerReuniones(viewer))) notFound();

  const proximo = new Date(evento.fecha_inicio) >= new Date();
  const asistire = !!user && evento.asistentes.some((p) => p.id === user.id);

  return (
    <div className="flex flex-col gap-10">
      <EventoHeader
        evento={evento}
        action={
          <AsistenciaControl
            eventoId={evento.id}
            viewer={viewer}
            proximo={proximo}
            asistire={asistire}
            count={evento.asistentes.length}
          />
        }
      />

      <div className="grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <SectionTitle>Descripción</SectionTitle>
          {evento.descripcion ? (
            <p className="whitespace-pre-line leading-relaxed text-text/90">{evento.descripcion}</p>
          ) : (
            <p className="font-mono text-sm text-text-muted">{"// Sin descripción"}</p>
          )}
        </section>
        <section>
          <SectionTitle>
            Asistentes
            {viewer === "miembro" && (
              <span className="ml-2 font-mono text-sm text-text-muted">({evento.asistentes.length})</span>
            )}
          </SectionTitle>
          <Card className="p-3">
            <AsistentesList asistentes={evento.asistentes} viewer={viewer} proximo={proximo} />
          </Card>
        </section>
      </div>

      <section>
        <SectionTitle>Evidencias</SectionTitle>
        {evidencias.length > 0 ? (
          <EvidenciasGallery evidencias={evidencias} />
        ) : (
          <EmptyState message={proximo ? "Las fotos llegarán después del evento" : "Aún no hay evidencias de este evento"} />
        )}
      </section>
    </div>
  );
}

export default function EventoPage(props: PageProps<"/eventos/[id]">) {
  return (
    <div>
      <BackLink href="/eventos">eventos</BackLink>
      <Suspense fallback={<EventoDetalleSkeleton />}>
        <EventoDetalle {...props} />
      </Suspense>
    </div>
  );
}
