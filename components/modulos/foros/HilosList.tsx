import Link from "next/link";
import { Pin } from "lucide-react";
import type { HiloConAutor } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

/** Hilos de un foro: fijados primero (ya vienen ordenados de lib/data). */
export function HilosList({ foroId, hilos }: { foroId: string; hilos: HiloConAutor[] }) {
  if (hilos.length === 0) {
    return <EmptyState message="Aún no hay hilos" description="Abre el primero con el botón “Nuevo hilo”." />;
  }

  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
      {hilos.map((hilo) => (
        <li key={hilo.id}>
          <Link
            href={`/foros/${foroId}/${hilo.id}`}
            className="flex items-center gap-3 px-4 py-3 transition first:rounded-t-xl last:rounded-b-xl hover:bg-surface-2"
          >
            {hilo.autor && <Avatar name={hilo.autor.nombre} src={hilo.autor.avatar_url} size="sm" />}
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 font-medium">
                {hilo.fijado && <Pin className="size-3.5 shrink-0 text-primary" aria-label="Fijado" />}
                <span className="truncate">{hilo.titulo}</span>
              </span>
              <span className="block truncate font-mono text-xs text-text-muted">
                {hilo.autor?.usuario_github ? `@${hilo.autor.usuario_github}` : hilo.autor?.nombre}
                {hilo.creado_en && ` · ${formatDate(hilo.creado_en)}`}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
