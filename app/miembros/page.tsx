import type { Metadata } from "next";
import { Suspense } from "react";
import { MiembroCard } from "@/components/modulos/miembros/MiembroCard";
import { MiembrosFilters } from "@/components/modulos/miembros/MiembrosFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getMiembros } from "@/lib/data/perfiles";
import { AREA_LABEL, ROL_LABEL, parseEnum } from "@/lib/labels";
import { MiembrosSkeleton } from "./MiembrosSkeleton";

export const metadata: Metadata = {
  title: "Miembros",
  description: "Las personas que forman la comunidad C_ALIGO.",
};

async function MiembrosContent({ searchParams }: PageProps<"/miembros">) {
  const params = await searchParams;
  const area = parseEnum(AREA_LABEL, params.area);
  const rol = parseEnum(ROL_LABEL, params.rol);
  const miembros = await getMiembros({ area, rol });

  return (
    <div className="flex flex-col gap-6">
      <MiembrosFilters area={area} rol={rol} />
      {miembros.length === 0 ? (
        <EmptyState message={area || rol ? "No hay miembros con esos filtros" : "Aún no hay miembros"} />
      ) : (
        <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {miembros.map((perfil) => (
            <li key={perfil.id}>
              <MiembroCard perfil={perfil} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MiembrosPage(props: PageProps<"/miembros">) {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Miembros
      </SectionTitle>
      <p className="mb-6 text-sm text-text-muted">Quienes forman C_ALIGO.</p>
      <Suspense fallback={<MiembrosSkeleton />}>
        <MiembrosContent {...props} />
      </Suspense>
    </div>
  );
}
