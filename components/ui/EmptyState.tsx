import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  /** Sin el prefijo: "Aún no hay eventos" se muestra como "// Aún no hay eventos". */
  message: string;
  description?: string;
  /** Botón de acción, solo si el usuario tiene permiso. */
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ message, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
    >
      <p className="font-mono text-sm text-text-muted">
        <span className="text-primary">{"// "}</span>
        {message}
      </p>
      {description && <p className="max-w-sm text-sm text-text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
