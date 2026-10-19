import Image from "next/image";
import { Award } from "lucide-react";
import type { Badge } from "@/types/database";
import { cn } from "@/lib/utils";

/** Badge con ícono (o 🏅 genérico), nombre y descripción. */
export function BadgeTile({ badge, className }: { badge: Badge; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-3 rounded-xl border border-border bg-surface p-3", className)}
      title={badge.descripcion ?? undefined}
    >
      <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-primary/10 text-primary">
        {badge.icono_url ? (
          <Image src={badge.icono_url} alt="" width={40} height={40} className="size-full object-cover" />
        ) : (
          <Award className="size-5" aria-hidden />
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-sm font-semibold">{badge.nombre}</span>
        {badge.descripcion && (
          <span className="line-clamp-2 text-xs text-text-muted">{badge.descripcion}</span>
        )}
      </span>
    </div>
  );
}
