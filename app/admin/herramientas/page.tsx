import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { HerramientasAdmin } from "@/components/modulos/admin/HerramientasAdmin";
import { requireDirectiva } from "@/lib/auth/guards";
import { getHerramientas } from "@/lib/data/herramientas";

export const metadata: Metadata = { title: "Herramientas" };

async function HerramientasContent() {
  await requireDirectiva();
  return <HerramientasAdmin herramientas={await getHerramientas()} />;
}

export default function AdminHerramientasPage() {
  return (
    <AdminPage title="Herramientas" description="Programas recomendados en /herramientas, agrupados por categoría.">
      <HerramientasContent />
    </AdminPage>
  );
}
