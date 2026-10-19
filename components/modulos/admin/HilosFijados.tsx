"use client";

import { useTransition } from "react";
import { Pin, PinOff } from "lucide-react";
import type { Foro, HiloConAutor } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { setHiloFijado } from "@/lib/actions/admin/foros";
import { formatDate } from "@/lib/utils";
import { AdminTable } from "./AdminTable";

function PinButton({ hilo }: { hilo: HiloConAutor }) {
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const fijado = !!hilo.fijado;

  return (
    <Button
      size="sm"
      variant={fijado ? "secondary" : "ghost"}
      loading={pending}
      aria-pressed={fijado}
      onClick={() =>
        startTransition(async () =>
          toast.fromResult(await setHiloFijado(hilo.id, !fijado), fijado ? "Hilo desfijado" : "Hilo fijado"),
        )
      }
      className={fijado ? "border-primary text-primary" : undefined}
    >
      {!pending && (fijado ? <PinOff className="size-4" aria-hidden /> : <Pin className="size-4" aria-hidden />)}
      {fijado ? "Desfijar" : "Fijar"}
    </Button>
  );
}

/** Lista de hilos de todos los foros con el botón para fijarlos. */
export function HilosFijados({ hilos, foros }: { hilos: HiloConAutor[]; foros: Foro[] }) {
  if (hilos.length === 0) return <p className="font-mono text-sm text-text-muted">{"// Aún no hay hilos"}</p>;

  return (
    <AdminTable
      rows={hilos}
      columns={[
        { header: "Hilo", cell: (h) => <span className="font-medium">{h.titulo}</span> },
        {
          header: "Foro",
          className: "font-mono text-xs text-text-muted",
          cell: (h) => `#${foros.find((f) => f.id === h.foro_id)?.nombre ?? "?"}`,
        },
        { header: "Autor", className: "text-xs", cell: (h) => h.autor?.nombre ?? "—" },
        { header: "Creado", className: "whitespace-nowrap font-mono text-xs", cell: (h) => (h.creado_en ? formatDate(h.creado_en) : "—") },
        { header: "Fijado", className: "w-px text-right", cell: (h) => <PinButton hilo={h} /> },
      ]}
    />
  );
}
