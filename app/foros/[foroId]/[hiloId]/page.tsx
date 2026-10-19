import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Pin } from "lucide-react";
import { ChatScroller } from "@/components/modulos/foros/ChatScroller";
import { MensajeComposer } from "@/components/modulos/foros/MensajeComposer";
import { MensajeItem } from "@/components/modulos/foros/MensajeItem";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { requireMiembro } from "@/lib/auth/guards";
import { getForoById, getHiloById, getMensajes } from "@/lib/data/foros";
import { isDirectiva } from "@/lib/labels";
import { isUuid } from "@/lib/utils";

export const metadata: Metadata = { title: "Hilo" };

// Sin realtime por ahora: los mensajes nuevos de otros aparecen al recargar.
// La suscripción a INSERT en `mensajes` llega en la fase de integración.
async function HiloContent({ params }: PageProps<"/foros/[foroId]/[hiloId]">) {
  const [{ foroId, hiloId }, user] = await Promise.all([params, requireMiembro()]);
  if (!isUuid(foroId) || !isUuid(hiloId)) notFound();

  const [foro, hilo, mensajes] = await Promise.all([
    getForoById(foroId),
    getHiloById(hiloId),
    getMensajes(hiloId),
  ]);
  if (!foro || !hilo || hilo.foro_id !== foro.id) notFound();
  const moderador = isDirectiva(user.rol);

  return (
    <div className="flex flex-col gap-4">
      <BackLink href={`/foros/${foro.id}`} className="">{`#${foro.nombre}`}</BackLink>
      <h1 className="flex items-center gap-2 font-display text-xl font-bold sm:text-2xl">
        {hilo.fijado && <Pin className="size-5 shrink-0 text-primary" aria-label="Fijado" />}
        {hilo.titulo}
      </h1>
      <Card className="flex flex-col overflow-hidden">
        <ChatScroller count={mensajes.length}>
          {mensajes.length === 0 ? (
            <p className="p-4 font-mono text-sm text-text-muted">{"// Aún no hay mensajes. ¡Escribe el primero!"}</p>
          ) : (
            <ul className="flex flex-col">
              {mensajes.map((m) => (
                <MensajeItem
                  key={m.id}
                  mensaje={m}
                  puedeEditar={m.autor_id === user.id}
                  puedeBorrar={moderador || m.autor_id === user.id}
                />
              ))}
            </ul>
          )}
        </ChatScroller>
        <MensajeComposer hiloId={hilo.id} />
      </Card>
    </div>
  );
}

export default function HiloPage(props: PageProps<"/foros/[foroId]/[hiloId]">) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4" aria-hidden>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      }
    >
      <HiloContent {...props} />
    </Suspense>
  );
}
