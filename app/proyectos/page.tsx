import type { Metadata } from "next";
import { Suspense } from "react";
import { ProyectosGrid } from "@/components/modulos/proyectos/ProyectosGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewButton } from "@/components/ui/NewButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProyectos } from "@/lib/data/proyectos";
import { getCurrentUser } from "@/lib/data/session";
import { isDirectiva } from "@/lib/labels";
import { ProyectosSkeleton } from "./ProyectosSkeleton";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos que construyen los miembros de C_ALIGO.",
};

async function ProyectosContent() {
  const [proyectos, user] = await Promise.all([getProyectos(), getCurrentUser()]);

  if (proyectos.length === 0) {
    return (
      <EmptyState
        message="Aún no hay proyectos"
        action={isDirectiva(user?.rol) && <NewButton href="/admin/proyectos">Nuevo proyecto</NewButton>}
      />
    );
  }
  return <ProyectosGrid proyectos={proyectos} />;
}

export default function ProyectosPage() {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Proyectos
      </SectionTitle>
      <p className="mb-6 text-sm text-text-muted">Lo que estamos construyendo como comunidad.</p>
      <Suspense fallback={<ProyectosSkeleton />}>
        <ProyectosContent />
      </Suspense>
    </div>
  );
}
