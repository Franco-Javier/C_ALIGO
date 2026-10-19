import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string };

/** Casilla con su etiqueta clicable. Se envía como "on" en el FormData. */
export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2.5 text-sm", className)}>
      <input type="checkbox" className="size-4 rounded border-border bg-surface-2 accent-[var(--primary)]" {...props} />
      {label}
    </label>
  );
}
