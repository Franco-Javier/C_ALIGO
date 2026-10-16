import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getNoticias } from "@/lib/data/noticias";
import { formatDate } from "@/lib/utils";

/** // ÚLTIMAS NOTICIAS: 5 titulares que abren la fuente original. */
export async function NoticiasSection() {
  const { items } = await getNoticias({ pageSize: 5 });

  if (items.length === 0) return <EmptyState message="Aún no hay noticias" />;

  return (
    <Card className="divide-y divide-border">
      {items.map((noticia) => (
        <a
          key={noticia.id}
          href={noticia.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 px-4 py-3.5 transition first:rounded-t-xl last:rounded-b-xl hover:bg-surface-2"
        >
          <div className="min-w-0 flex-1">
            <p className="font-medium leading-snug transition group-hover:text-primary">
              {noticia.titulo}
            </p>
            <p className="mt-1 font-mono text-xs text-text-muted">
              {noticia.fuente}
              {noticia.fuente && noticia.publicado_en && " · "}
              {noticia.publicado_en && formatDate(noticia.publicado_en)}
            </p>
          </div>
          <ArrowUpRight
            className="mt-0.5 size-4 shrink-0 text-text-muted transition group-hover:text-primary"
            aria-label="Abre en una pestaña nueva"
          />
        </a>
      ))}
    </Card>
  );
}
