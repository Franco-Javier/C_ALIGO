import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { cardStyles } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewButton } from "@/components/ui/NewButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { requireMiembro } from "@/lib/auth/guards";
import { getForos } from "@/lib/data/foros";
import { foroTree } from "@/lib/foros";
import { isDirectiva } from "@/lib/labels";

export const metadata: Metadata = { title: "Foros" };

async function ForosContent() {
  const user = await requireMiembro();
  const foros = await getForos();

  if (foros.length === 0) {
    return (
      <EmptyState
        message="Aún no hay foros"
        action={isDirectiva(user.rol) && <NewButton href="/admin/foros">Nuevo foro</NewButton>}
      />
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {foroTree(foros).map(({ foro, subforos }) => (
        <li key={foro.id}>
          <Link href={`/foros/${foro.id}`} className={cardStyles({ interactive: true, className: "flex h-full flex-col gap-1 p-4" })}>
            <span className="font-display font-semibold">
              <span className="font-mono text-primary">#</span> {foro.nombre}
            </span>
            {foro.descripcion && <span className="text-sm text-text-muted">{foro.descripcion}</span>}
            {subforos.length > 0 && (
              <span className="mt-1 font-mono text-xs text-text-muted">
                {subforos.map((s) => `└ #${s.nombre}`).join("  ")}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ForosPage() {
  return (
    <div>
      <SectionTitle as="h1" prefix=">_" className="mb-2">
        Foros
      </SectionTitle>
      <p className="mb-6 text-sm text-text-muted">Elige un foro para ver sus hilos.</p>
      <Suspense
        fallback={
          <div className="grid gap-3 sm:grid-cols-2" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        }
      >
        <ForosContent />
      </Suspense>
    </div>
  );
}
