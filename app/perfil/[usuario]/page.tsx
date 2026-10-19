import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BadgeTile } from "@/components/modulos/badges/BadgeTile";
import { PerfilActividad } from "@/components/modulos/perfil/PerfilActividad";
import { PerfilHeader } from "@/components/modulos/perfil/PerfilHeader";
import { ProyectosGrid } from "@/components/modulos/proyectos/ProyectosGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getBadgesDePerfil } from "@/lib/data/badges";
import { getActividadDePerfil, getPerfilByUsuario } from "@/lib/data/perfiles";
import { getProyectosDePerfil } from "@/lib/data/proyectos";
import { getCurrentUser } from "@/lib/data/session";
import { viewerOf } from "@/lib/labels";
import { PerfilSkeleton } from "./PerfilSkeleton";

// Pendiente (Fase 4, SEO): generateMetadata con el nombre del miembro.
export const metadata: Metadata = { title: "Perfil" };

const EMPTY = "font-mono text-sm text-text-muted";

async function PerfilContent({ params }: PageProps<"/perfil/[usuario]">) {
  const { usuario } = await params;
  const [perfil, user] = await Promise.all([
    getPerfilByUsuario(decodeURIComponent(usuario)),
    getCurrentUser(),
  ]);
  // Los pendientes aún no son miembros: su perfil no es público (igual que en /miembros).
  if (!perfil || (perfil.estado === "pendiente" && perfil.id !== user?.id)) notFound();

  const viewer = viewerOf(user);
  const [badges, proyectos, actividad] = await Promise.all([
    getBadgesDePerfil(perfil.id),
    getProyectosDePerfil(perfil.id),
    viewer === "miembro" ? getActividadDePerfil(perfil.id) : null,
  ]);

  return (
    <div className="flex flex-col gap-10">
      <PerfilHeader perfil={perfil} />

      <section>
        <SectionTitle>Badges</SectionTitle>
        {badges.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <li key={badge.id}>
                <BadgeTile badge={badge} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={EMPTY}>{"// Aún no tiene badges"}</p>
        )}
      </section>

      <section>
        <SectionTitle>Proyectos</SectionTitle>
        {proyectos.length > 0 ? (
          <ProyectosGrid proyectos={proyectos} />
        ) : (
          <p className={EMPTY}>{"// Aún no participa en proyectos"}</p>
        )}
      </section>

      <section>
        <SectionTitle>Actividad</SectionTitle>
        <PerfilActividad actividad={actividad} viewer={viewer} />
      </section>
    </div>
  );
}

export default function PerfilPage(props: PageProps<"/perfil/[usuario]">) {
  return (
    <Suspense fallback={<PerfilSkeleton />}>
      <PerfilContent {...props} />
    </Suspense>
  );
}
