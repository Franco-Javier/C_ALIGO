import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Contadores, ContadoresSkeleton } from "@/components/modulos/inicio/Contadores";
import { Hero } from "@/components/modulos/inicio/Hero";
import { ImpactoSection } from "@/components/modulos/inicio/ImpactoSection";
import { NoticiasSection } from "@/components/modulos/inicio/NoticiasSection";
import { ProximosEventosSection } from "@/components/modulos/inicio/ProximosEventosSection";
import { ProyectosActivosSection } from "@/components/modulos/inicio/ProyectosActivosSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

function SeeAll({ href, children = "Ver todos →" }: { href: string; children?: ReactNode }) {
  return (
    <Link href={href} className="shrink-0 rounded font-mono text-xs text-primary hover:underline">
      {children}
    </Link>
  );
}

function CardsFallback({ count = 3, withImage = true }: { count?: number; withImage?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} withImage={withImage} />
      ))}
    </div>
  );
}

// El hero es estático; cada sección con datos se transmite en su propio <Suspense>.
export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <Hero />
        <Suspense fallback={<ContadoresSkeleton />}>
          <Contadores />
        </Suspense>
      </div>

      <section>
        <SectionTitle action={<SeeAll href="/impacto">Ver todo →</SeeAll>}>Impacto</SectionTitle>
        <Suspense fallback={<CardsFallback />}>
          <ImpactoSection />
        </Suspense>
      </section>

      <section>
        <SectionTitle action={<SeeAll href="/eventos" />}>Próximos eventos</SectionTitle>
        <Suspense fallback={<CardsFallback withImage={false} />}>
          <ProximosEventosSection />
        </Suspense>
      </section>

      <section>
        <SectionTitle action={<SeeAll href="/proyectos" />}>Proyectos activos</SectionTitle>
        <Suspense fallback={<CardsFallback />}>
          <ProyectosActivosSection />
        </Suspense>
      </section>

      <section>
        <SectionTitle action={<SeeAll href="/noticias">Ver todas →</SeeAll>}>
          Últimas noticias
        </SectionTitle>
        <Suspense fallback={<Skeleton className="h-80 rounded-xl" />}>
          <NoticiasSection />
        </Suspense>
      </section>
    </div>
  );
}
