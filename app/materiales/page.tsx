import type { Metadata } from "next";
import { Suspense } from "react";
import { MaterialCard } from "@/components/modulos/materiales/MaterialCard";
import { MaterialesFilters } from "@/components/modulos/materiales/MaterialesFilters";
import { SubirMaterialButton } from "@/components/modulos/materiales/SubirMaterialButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { requireMiembro } from "@/lib/auth/guards";
import { getMateriales, getTemasMateriales } from "@/lib/data/materiales";
import { TIPO_MATERIAL_LABEL, parseEnum } from "@/lib/labels";

export const metadata: Metadata = { title: "Materiales" };

async function MaterialesContent({ searchParams }: PageProps<"/materiales">) {
  const [params] = await Promise.all([searchParams, requireMiembro()]);
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : undefined;
  const temaParam = typeof params.tema === "string" ? params.tema : undefined;
  const tipo = parseEnum(TIPO_MATERIAL_LABEL, params.tipo);

  const temas = await getTemasMateriales();
  const tema = temas.find((t) => t === temaParam);
  const materiales = await getMateriales({ q: q || undefined, tema, tipo });
  const filtrando = !!(q || tema || tipo);

  return (
    <div className="flex flex-col gap-6">
      <MaterialesFilters q={q} tema={tema} tipo={tipo} temas={temas} />
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-text-muted">
          {materiales.length} {materiales.length === 1 ? "material" : "materiales"}
        </span>
        <SubirMaterialButton temas={temas} />
      </div>
      {materiales.length === 0 ? (
        <EmptyState
          message={filtrando ? "No hay materiales con esos filtros" : "Aún no hay materiales"}
          description={filtrando ? undefined : "Comparte el primero con “Subir material”."}
        />
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {materiales.map((m) => (
            <li key={m.id} className="flex *:flex-1">
              <MaterialCard material={m} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MaterialesPage(props: PageProps<"/materiales">) {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Materiales
      </SectionTitle>
      <p className="mb-6 text-sm text-text-muted">Guías, cursos y enlaces que comparte la comunidad.</p>
      <Suspense
        fallback={
          <div className="flex flex-col gap-6" aria-hidden>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-80" />
            <div className="grid gap-3 lg:grid-cols-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          </div>
        }
      >
        <MaterialesContent {...props} />
      </Suspense>
    </div>
  );
}
