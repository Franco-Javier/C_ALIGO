import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { EvidenciasAdmin } from "@/components/modulos/admin/EvidenciasAdmin";
import { requireDirectiva } from "@/lib/auth/guards";
import { getEventos } from "@/lib/data/eventos";
import { getEvidencias } from "@/lib/data/evidencias";
import { getProyectos } from "@/lib/data/proyectos";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Evidencias" };

async function EvidenciasContent() {
  await requireDirectiva();
  const [evidencias, eventos, proyectos] = await Promise.all([
    getEvidencias(),
    getEventos({ incluirReuniones: true }),
    getProyectos(),
  ]);

  return (
    <EvidenciasAdmin
      evidencias={evidencias}
      eventos={eventos.reverse().map((e) => ({ value: e.id, label: `${e.titulo} (${formatDate(e.fecha_inicio)})` }))}
      proyectos={proyectos.map((p) => ({ value: p.id, label: p.nombre }))}
    />
  );
}

export default function AdminEvidenciasPage() {
  return (
    <AdminPage title="Evidencias" description="Fotos de lo que hace la comunidad. Se muestran en el Inicio y en Impacto.">
      <EvidenciasContent />
    </AdminPage>
  );
}
