import { Suspense, type ReactNode } from "react";
import { ForosNav } from "@/components/modulos/foros/ForosNav";
import { Skeleton } from "@/components/ui/Skeleton";
import { requireMiembro } from "@/lib/auth/guards";
import { getForos } from "@/lib/data/foros";

async function ForosSidebar() {
  await requireMiembro();
  const foros = await getForos();
  return <ForosNav foros={foros} />;
}

/**
 * Escritorio: columna de foros + contenido (estilo Discord).
 * Móvil: navegación por pantallas (lista de foros → hilos → chat), sin columna.
 * La columna "En línea" (Presence) llega en la Fase 4.
 */
export default function ForosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-border bg-surface p-2">
          <Suspense
            fallback={
              <div className="flex flex-col gap-1.5 p-1" aria-hidden>
                {Array.from({ length: 6 }, (_, i) => (
                  <Skeleton key={i} className="h-7" />
                ))}
              </div>
            }
          >
            <ForosSidebar />
          </Suspense>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
