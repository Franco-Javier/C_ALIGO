"use client";

import { useOptimistic, useTransition } from "react";
import { Check, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { setAsistencia } from "@/lib/actions/eventos";

type AsistireButtonProps = { eventoId: string; asistire: boolean; count: number };

/** Botón "Asistiré" para miembros, con actualización optimista del conteo. */
export function AsistireButton({ eventoId, asistire, count }: AsistireButtonProps) {
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [state, setOptimistic] = useOptimistic(
    { asistire, count },
    (current, next: boolean) => ({ asistire: next, count: current.count + (next ? 1 : -1) }),
  );

  const toggle = () => {
    const next = !state.asistire;
    startTransition(async () => {
      setOptimistic(next);
      const result = await setAsistencia(eventoId, next);
      toast.fromResult(result, next ? "Te esperamos en el evento" : "Quitaste tu asistencia");
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        variant={state.asistire ? "secondary" : "primary"}
        aria-pressed={state.asistire}
        disabled={pending}
        onClick={toggle}
        className={state.asistire ? "border-primary text-primary" : undefined}
      >
        {state.asistire && <Check className="size-4" aria-hidden />}
        {state.asistire ? "Asistirás" : "Asistiré"}
      </Button>
      <AsistentesCount count={state.count} />
    </div>
  );
}

export function AsistentesCount({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-1 font-mono text-xs text-text-muted">
      <Users className="size-3.5" aria-hidden />
      {count} <span className="sr-only">asistentes</span>
    </span>
  );
}
