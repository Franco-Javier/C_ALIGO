import { EmptyState } from "@/components/ui/EmptyState";
import { getEvidencias } from "@/lib/data/evidencias";
import { EvidenciasGallery } from "./EvidenciasGallery";

/** // IMPACTO: las 6 evidencias más recientes; clic abre la galería. */
export async function ImpactoSection() {
  const evidencias = await getEvidencias({ limit: 6 });

  if (evidencias.length === 0) return <EmptyState message="Aún no hay evidencias" />;
  return <EvidenciasGallery evidencias={evidencias} />;
}
