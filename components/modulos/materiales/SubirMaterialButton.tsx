"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { crearMaterial } from "@/lib/actions/materiales";
import { TIPO_MATERIAL_LABEL } from "@/lib/labels";

const TIPOS = Object.entries(TIPO_MATERIAL_LABEL).map(([value, label]) => ({ value, label }));

/** [+ Subir material] con su modal. Los documentos se suben como enlace hasta conectar Storage. */
export function SubirMaterialButton({ temas }: { temas: string[] }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(form: FormData) {
    startTransition(async () => {
      const result = await crearMaterial(form);
      toast.fromResult(result, "Material publicado");
      if (result.ok) setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" aria-hidden /> Subir material
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Subir material">
        <form action={onSubmit} className="flex flex-col gap-4">
          <Input label="Título" name="titulo" required maxLength={150} />
          <Select label="Tipo" name="tipo" options={TIPOS} defaultValue="link" required />
          <Input
            label="Enlace"
            name="url"
            type="url"
            required
            placeholder="https://..."
            hint="Para documentos, pega por ahora un enlace (Drive, GitHub...). La subida de archivos llega pronto."
          />
          <Input label="Tema" name="tema" list="temas-materiales" maxLength={40} placeholder="Ej. Python" />
          <datalist id="temas-materiales">
            {temas.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
          <Textarea label="Descripción" name="descripcion" rows={3} maxLength={500} />
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
