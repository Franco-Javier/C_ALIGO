import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  /** Prefijo decorativo; por defecto "#" (#Python). */
  prefix?: string;
  className?: string;
};

/** Etiqueta de tema o tecnología, estilo código. */
export function Tag({ children, prefix = "#", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-text-muted",
        className,
      )}
    >
      {prefix && <span className="text-primary">{prefix}</span>}
      {children}
    </span>
  );
}
