import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: ReactNode;
  /** "//" para secciones, ">_" para títulos de página. */
  prefix?: "//" | ">_";
  as?: "h1" | "h2" | "h3";
  /** Enlace o botón a la derecha, ej. "Ver todo →". */
  action?: ReactNode;
  className?: string;
};

export function SectionTitle({
  children,
  prefix = "//",
  as: Tag = "h2",
  action,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-4", className)}>
      <Tag
        className={cn(
          "font-display font-semibold uppercase tracking-wide",
          Tag === "h1" ? "text-2xl sm:text-3xl" : "text-lg",
        )}
      >
        <span className="mr-2 font-mono text-primary" aria-hidden>
          {prefix}
        </span>
        {children}
      </Tag>
      {/* Línea fina de la marca entre el título y la acción */}
      <span aria-hidden className="h-px min-w-4 flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      {action}
    </div>
  );
}
