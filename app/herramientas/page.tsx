import type { Metadata } from "next";
import { Suspense } from "react";
import { HerramientaCard } from "@/components/modulos/herramientas/HerramientaCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewButton } from "@/components/ui/NewButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getHerramientas } from "@/lib/data/herramientas";
import { getCurrentUser } from "@/lib/data/session";
import { isDirectiva } from "@/lib/labels";
import { HerramientasSkeleton } from "./HerramientasSkeleton";

export const metadata: Metadata = {
  title: "Herramientas",
  description: "Programas recomendados por la comunidad C_ALIGO, listos para descargar.",
};

async function HerramientasContent() {
  const [herramientas, user] = await Promise.all([getHerramientas(), getCurrentUser()]);

  if (herramientas.length === 0) {
    return (
      <EmptyState
        message="Aún no hay herramientas"
        action={isDirectiva(user?.rol) && <NewButton href="/admin/herramientas">Nueva herramienta</NewButton>}
      />
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {herramientas.map((h) => (
        <li key={h.id}>
          <HerramientaCard herramienta={h} />
        </li>
      ))}
    </ul>
  );
}

export default function HerramientasPage() {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Herramientas
      </SectionTitle>
      <p className="mb-8 text-sm text-text-muted">Lo que usamos en la comunidad. Clic para descargar.</p>
      <Suspense fallback={<HerramientasSkeleton />}>
        <HerramientasContent />
      </Suspense>
    </div>
  );
}
