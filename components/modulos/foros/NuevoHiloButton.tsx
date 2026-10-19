"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { crearHilo } from "@/lib/actions/foros";

/** Botón + modal para abrir un hilo con su primer mensaje. */
export function NuevoHiloButton({ foroId }: { foroId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(form: FormData) {
    startTransition(async () => {
      const result = await crearHilo(foroId, form);
      if (!result.ok) return toast.error(result.error);
      setOpen(false);
      router.push(`/foros/${foroId}/${result.data}`);
    });
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="size-4" aria-hidden /> Nuevo hilo
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo hilo">
        <form id="nuevo-hilo" action={onSubmit} className="flex flex-col gap-4">
          <Input label="Título" name="titulo" required maxLength={120} placeholder="¿Qué stack usar para...?" />
          <Textarea label="Primer mensaje" name="contenido" required maxLength={2000} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={pending}>
              Cancelar
            </Button>
            <Button type="submit" loading={pending}>
              Publicar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
