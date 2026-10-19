import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BadgeTile } from "@/components/modulos/badges/BadgeTile";
import { ProyectoEquipo } from "@/components/modulos/proyectos/ProyectoEquipo";
import { ProyectoHeader } from "@/components/modulos/proyectos/ProyectoHeader";
import { ProyectoRepo } from "@/components/modulos/proyectos/ProyectoRepo";
import { BackLink } from "@/components/ui/BackLink";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getBadgesDeProyecto } from "@/lib/data/badges";
import { getProyectoById } from "@/lib/data/proyectos";
import { isUuid } from "@/lib/utils";
import { ProyectoDetalleSkeleton } from "./ProyectoDetalleSkeleton";

// Pendiente (Fase 4, SEO): generateMetadata con el nombre del proyecto.
export const metadata: Metadata = { title: "Proyecto" };

async function ProyectoDetalle({ params }: PageProps<"/proyectos/[id]">) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const [proyecto, badges] = await Promise.all([getProyectoById(id), getBadgesDeProyecto(id)]);
  if (!proyecto) notFound();

  return (
    <div className="flex flex-col gap-10">
      <ProyectoHeader proyecto={proyecto} />

      <section>
        <SectionTitle>Equipo</SectionTitle>
        <ProyectoEquipo miembros={proyecto.miembros} />
      </section>

      <section>
        <SectionTitle>Repositorio</SectionTitle>
        <ProyectoRepo repo={proyecto.repo_github} />
      </section>

      <section>
        <SectionTitle>Badges del proyecto</SectionTitle>
        {badges.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <li key={badge.id}>
                <BadgeTile badge={badge} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-sm text-text-muted">{"// Este proyecto aún no tiene badges"}</p>
        )}
      </section>
    </div>
  );
}

export default function ProyectoPage(props: PageProps<"/proyectos/[id]">) {
  return (
    <div>
      <BackLink href="/proyectos">proyectos</BackLink>
      <Suspense fallback={<ProyectoDetalleSkeleton />}>
        <ProyectoDetalle {...props} />
      </Suspense>
    </div>
  );
}
