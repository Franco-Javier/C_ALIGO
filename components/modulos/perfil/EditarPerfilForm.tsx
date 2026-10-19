"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Perfil } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { updateMiPerfil } from "@/lib/actions/perfil";
import { AREA_LABEL } from "@/lib/labels";

const AREAS = Object.entries(AREA_LABEL).map(([value, label]) => ({ value, label }));

/** Formulario de §7.12: nombre, carrera, área y bio. Sin rol ni estado. */
export function EditarPerfilForm({ perfil }: { perfil: Perfil }) {
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();

  function onSubmit(form: FormData) {
    startTransition(async () => {
      const result = await updateMiPerfil(form);
      toast.fromResult(result, "Perfil actualizado");
      if (result.ok && perfil.usuario_github) router.push(`/perfil/${perfil.usuario_github}`);
    });
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-4">
      <Input label="Nombre" name="nombre" defaultValue={perfil.nombre} required maxLength={80} />
      <Input
        label="Carrera"
        name="carrera"
        defaultValue={perfil.carrera ?? ""}
        placeholder="Ej. Desarrollo de Software"
        maxLength={100}
      />
      <Select
        label="Área"
        name="area"
        defaultValue={perfil.area ?? ""}
        options={AREAS}
        placeholder="Elige tu área"
      />
      <Textarea
        label="Bio"
        name="bio"
        defaultValue={perfil.bio ?? ""}
        placeholder="Cuéntale a la comunidad qué te gusta construir"
        hint="Hasta 500 caracteres"
        maxLength={500}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" loading={pending}>
          Guardar
        </Button>
        <Button variant="ghost" onClick={() => router.back()} disabled={pending}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
