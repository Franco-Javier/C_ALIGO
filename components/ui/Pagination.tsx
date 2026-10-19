import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonStyles } from "./Button";

type PaginationProps = {
  page: number;
  totalPages: number;
  /** Construye el enlace de cada página, ej. (p) => `/noticias?page=${p}`. */
  href: (page: number) => string;
};

/** ← Anterior · 2 / 5 · Siguiente → (enlaces, funcionan sin JS). */
export function Pagination({ page, totalPages, href }: PaginationProps) {
  if (totalPages <= 1) return null;
  const disabled = "pointer-events-none opacity-40";

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-3">
      <Link
        href={href(page - 1)}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : undefined}
        className={buttonStyles({ variant: "secondary", size: "sm", className: page <= 1 ? disabled : "" })}
      >
        <ChevronLeft className="size-4" aria-hidden /> Anterior
      </Link>
      <span className="font-mono text-xs text-text-muted">
        {page} / {totalPages}
      </span>
      <Link
        href={href(page + 1)}
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : undefined}
        className={buttonStyles({ variant: "secondary", size: "sm", className: page >= totalPages ? disabled : "" })}
      >
        Siguiente <ChevronRight className="size-4" aria-hidden />
      </Link>
    </nav>
  );
}
