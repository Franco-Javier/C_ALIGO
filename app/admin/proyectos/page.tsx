import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { ProyectosAdmin } from "@/components/modulos/admin/ProyectosAdmin";
import { requireDirectiva } from "@/lib/auth/guards";
import { getMiembros } from "@/lib/data/perfiles";
import { getProyectos } from "@/lib/data/proyectos";

export const metadata: Metadata = { title: "Proyectos" };

async function ProyectosContent() {
  await requireDirectiva();
  const [proyectos, miembros] = await Promise.all([getProyectos(), getMiembros()]);

  return (
    <ProyectosAdmin
      proyectos={proyectos}
      miembros={miembros.map((m) => ({
        value: m.id,
        label: m.usuario_github ? `${m.nombre} (@${m.usuario_github})` : m.nombre,
      }))}
    />
  );
}

export default function AdminProyectosPage() {
  return (
    <AdminPage title="Proyectos" description="Proyectos de la comunidad y sus integrantes (botón de equipo en cada fila).">
      <ProyectosContent />
    </AdminPage>
  );
}
