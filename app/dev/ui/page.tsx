import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { DataPreview } from "./_components/DataPreview";
import { DemoSection } from "./_components/DemoSection";
import { FormsDemo } from "./_components/FormsDemo";
import { ModalDemo } from "./_components/ModalDemo";
import { PrimitivesDemo } from "./_components/PrimitivesDemo";
import { TokensDemo } from "./_components/TokensDemo";

// Página TEMPORAL de la Fase 0 para revisar los componentes. Borrar antes de producción.
export const metadata: Metadata = {
  title: "UI (dev)",
  robots: { index: false, follow: false },
};

export default function DevUiPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <SectionTitle as="h1" prefix=">_">
          Componentes
        </SectionTitle>
        <p className="text-sm text-text-muted">
          Página temporal de la Fase 0. Muestra los tokens y todos los componentes de{" "}
          <code className="font-mono text-primary">components/ui</code>.
        </p>
      </div>

      <TokensDemo />
      <PrimitivesDemo />
      <FormsDemo />

      <DemoSection title="Modal">
        <ModalDemo />
      </DemoSection>

      <DemoSection title="Datos (lib/data → mock)">
        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <DataPreview />
        </Suspense>
      </DemoSection>
    </div>
  );
}
