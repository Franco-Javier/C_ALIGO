import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Borde verde en hover (tarjetas clicables). */
  interactive?: boolean;
};

export function cardStyles({ interactive = false, className }: { interactive?: boolean; className?: string } = {}) {
  return cn(
    "rounded-xl border border-border bg-surface",
    interactive && "transition hover:border-primary",
    className,
  );
}

export function Card({ interactive, className, ...props }: CardProps) {
  return <div className={cardStyles({ interactive, className })} {...props} />;
}
