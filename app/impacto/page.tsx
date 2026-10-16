import type { Metadata } from "next";
import { Suspense } from "react";
import { EvidenciasGallery } from "@/components/modulos/evidencias/EvidenciasGallery";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getEvidencias } from "@/lib/data/evidencias";
import { TIPOS_EVENTO_FILTRO, TIPO_EVENTO_LABEL, parseTipoEvento } from "@/lib/labels";
import { ImpactoSkeleton } from "./ImpactoSkeleton";

export const metadata: Metadata = {
  title: "Impacto",
  description: "Hackathons, charlas, giras y stands de la comunidad C_ALIGO.",
};

async function ImpactoContent({ searchParams }: PageProps<"/impacto">) {
  const tipo = parseTipoEvento((await searchParams).tipo);
  const evidencias = await getEvidencias({ tipoEvento: tipo });

  const chips = [
    { label: "Todos", href: "/impacto", active: !tipo },
    ...TIPOS_EVENTO_FILTRO.map((t) => ({
      label: TIPO_EVENTO_LABEL[t],
      href: `/impacto?tipo=${t}`,
      active: t === tipo,
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <FilterChips label="Tipo de evento" chips={chips} />
      {evidencias.length === 0 ? (
        <EmptyState
          message={tipo ? `Aún no hay evidencias de tipo ${TIPO_EVENTO_LABEL[tipo].toLowerCase()}` : "Aún no hay evidencias"}
        />
      ) : (
        <EvidenciasGallery evidencias={evidencias} />
      )}
    </div>
  );
}

export default function ImpactoPage(props: PageProps<"/impacto">) {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Impacto
      </SectionTitle>
      <p className="mb-6 text-sm text-text-muted">
        Hackathons, charlas, giras y stands: lo que la comunidad ha hecho.
      </p>
      <Suspense fallback={<ImpactoSkeleton />}>
        <ImpactoContent {...props} />
      </Suspense>
    </div>
  );
}
