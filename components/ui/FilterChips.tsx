import Link from "next/link";
import { cn } from "@/lib/utils";

export type FilterChip = { label: string; href: string; active: boolean };

type FilterChipsProps = {
  /** Describe el grupo para lectores de pantalla, ej. "Tipo de evento". */
  label: string;
  chips: FilterChip[];
  className?: string;
};

/** Filtros como enlaces (?tipo=...): funcionan sin JavaScript y se pueden compartir. */
export function FilterChips({ label, chips, className }: FilterChipsProps) {
  return (
    <nav aria-label={label} className={cn("-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0", className)}>
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {chips.map((chip) => (
          <li key={chip.href}>
            <Link
              href={chip.href}
              scroll={false}
              aria-current={chip.active ? "page" : undefined}
              className={cn(
                "inline-flex h-8 items-center rounded-lg border px-3 font-display text-sm transition",
                chip.active
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-surface text-text-muted hover:border-primary hover:text-text",
              )}
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
