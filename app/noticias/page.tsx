import type { Metadata } from "next";
import { Suspense } from "react";
import { NoticiaCard } from "@/components/modulos/noticias/NoticiaCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { NOTICIAS_POR_PAGINA, getNoticias } from "@/lib/data/noticias";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Titulares de tecnología, ciberseguridad, redes e IA.",
};

const pageHref = (page: number) => (page <= 1 ? "/noticias" : `/noticias?page=${page}`);

async function NoticiasContent({ searchParams }: PageProps<"/noticias">) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Math.floor(Number(pageParam)) || 1);
  const { items, total } = await getNoticias({ page });
  const totalPages = Math.ceil(total / NOTICIAS_POR_PAGINA);

  if (items.length === 0) {
    return <EmptyState message={page > 1 ? "No hay más noticias" : "Aún no hay noticias"} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((noticia) => (
          <li key={noticia.id}>
            <NoticiaCard noticia={noticia} />
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} href={pageHref} />
    </div>
  );
}

function NoticiasSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <SkeletonCard key={i} withImage={false} />
      ))}
    </div>
  );
}

export default function NoticiasPage(props: PageProps<"/noticias">) {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Noticias
      </SectionTitle>
      <p className="mb-6 text-sm text-text-muted">
        Tecnología, ciberseguridad, redes e IA. Se actualizan una vez al día.
      </p>
      <Suspense fallback={<NoticiasSkeleton />}>
        <NoticiasContent {...props} />
      </Suspense>
    </div>
  );
}
