"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function ToastDemo() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast.success("Evento guardado")}>
        Éxito
      </Button>
      <Button variant="secondary" onClick={() => toast.error("No se pudo guardar el evento")}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => toast.info("Tienes cambios sin guardar")}>
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.fromResult({ ok: false, error: "Ya estás inscrito" })}
      >
        fromResult(error)
      </Button>
    </div>
  );
}
