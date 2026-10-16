import type { ReactNode } from "react";
import type { EstadoProyecto, RolUsuario } from "@/types/database";
import { ESTADO_PROYECTO_LABEL, ROL_LABEL, isDirectiva } from "@/lib/labels";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "warning" | "danger" | "outline";

const TONES: Record<Tone, string> = {
  neutral: "border-border bg-surface-2 text-text-muted",
  primary: "border-primary/40 bg-primary/15 text-primary",
  warning: "border-warning/40 bg-warning/15 text-warning",
  danger: "border-danger/40 bg-danger/15 text-danger",
  outline: "border-primary bg-transparent text-text",
};

type BadgeProps = { tone?: Tone; className?: string; children: ReactNode };

/** Etiqueta de estado en mayúsculas y mono: [EN PROGRESO], [PRESIDENTE]. */
export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5",
        "font-mono text-[11px] font-medium uppercase tracking-wider",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const ESTADO_TONE: Record<EstadoProyecto, Tone> = {
  idea: "neutral",
  en_progreso: "primary",
  pausado: "warning",
  terminado: "outline",
};

export function EstadoProyectoBadge({ estado }: { estado: EstadoProyecto }) {
  return <Badge tone={ESTADO_TONE[estado]}>{ESTADO_PROYECTO_LABEL[estado]}</Badge>;
}

export function RolBadge({ rol }: { rol: RolUsuario }) {
  return <Badge tone={isDirectiva(rol) ? "primary" : "neutral"}>{ROL_LABEL[rol]}</Badge>;
}
