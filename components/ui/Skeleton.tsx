import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Bloque gris animado para loading.tsx. Dale forma con className (h-*, w-*, rounded-*). */
export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div aria-hidden style={style} className={cn("animate-pulse rounded-lg bg-surface-2", className)} />
  );
}

/** Formulario de carga: campos + área de texto + botón. */
export function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      {Array.from({ length: fields }, (_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-10 w-28" />
    </div>
  );
}

/** Tarjeta genérica de carga: imagen + título + dos líneas. */
export function SkeletonCard({ withImage = true }: { withImage?: boolean }) {
  return (
    <div aria-hidden className="rounded-xl border border-border bg-surface p-4">
      {withImage && <Skeleton className="mb-4 aspect-video w-full" />}
      <Skeleton className="mb-3 h-5 w-2/3" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}
