import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { EventosAdmin } from "@/components/modulos/admin/EventosAdmin";
import { requireDirectiva } from "@/lib/auth/guards";
import { getEventos } from "@/lib/data/eventos";

export const metadata: Metadata = { title: "Eventos" };

async function EventosContent() {
  await requireDirectiva();
  const eventos = await getEventos({ incluirReuniones: true });
  return <EventosAdmin eventos={eventos.reverse()} />;
}

export default function AdminEventosPage() {
  return (
    <AdminPage title="Eventos" description="Crea, edita y elimina eventos. Los más recientes primero.">
      <EventosContent />
    </AdminPage>
  );
}
