import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { BadgesAdmin } from "@/components/modulos/admin/BadgesAdmin";
import { requireDirectiva } from "@/lib/auth/guards";
import { getBadgesAdmin } from "@/lib/data/badges";
import { getMiembros } from "@/lib/data/perfiles";
import { getProyectos } from "@/lib/data/proyectos";

export const metadata: Metadata = { title: "Badges" };

async function BadgesContent() {
  await requireDirectiva();
  const [badges, miembros, proyectos] = await Promise.all([getBadgesAdmin(), getMiembros(), getProyectos()]);

  return (
    <BadgesAdmin
      badges={badges}
      miembros={miembros.map((m) => ({ value: m.id, label: m.nombre }))}
      proyectos={proyectos.map((p) => ({ value: p.id, label: p.nombre }))}
    />
  );
}

export default function AdminBadgesPage() {
  return (
    <AdminPage title="Badges" description="Crea badges y otórgalos a los miembros (botón de regalo en cada fila).">
      <BadgesContent />
    </AdminPage>
  );
}
