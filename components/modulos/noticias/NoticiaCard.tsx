import { ArrowUpRight } from "lucide-react";
import type { Noticia } from "@/types/database";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

/** Título, fuente, fecha, resumen y "Leer en la fuente" (§7.9). */
export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <Card className="flex h-full flex-col gap-2 p-4">
      <p className="font-mono text-xs text-text-muted">
        {noticia.fuente && <span className="text-primary">{noticia.fuente}</span>}
        {noticia.fuente && noticia.publicado_en && " · "}
        {noticia.publicado_en && formatDate(noticia.publicado_en)}
      </p>
      <h2 className="font-display font-semibold leading-snug">{noticia.titulo}</h2>
      {noticia.resumen && <p className="line-clamp-3 text-sm text-text-muted">{noticia.resumen}</p>}
      <a
        href={noticia.url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles({ variant: "secondary", size: "sm", className: "mt-auto self-start" })}
      >
        Leer en la fuente <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(abre en una pestaña nueva)</span>
      </a>
    </Card>
  );
}
