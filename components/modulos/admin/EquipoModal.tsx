"use client";

import { useRef, useTransition } from "react";
import { UserMinus } from "lucide-react";
import type { ProyectoConEquipo } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { addIntegrante, removeIntegrante } from "@/lib/actions/admin/proyectos";

type Option = { value: string; label: string };
type EquipoModalProps = { proyecto: ProyectoConEquipo | null; miembros: Option[]; onClose: () => void };

/** Integrantes de un proyecto: agregar (con su función) y quitar. */
export function EquipoModal({ proyecto, miembros, onClose }: EquipoModalProps) {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  if (!proyecto) return null;
  const proyectoId = proyecto.id;
  const enEquipo = new Set(proyecto.miembros.map((m) => m.perfil_id));

  const onAdd = (form: FormData) =>
    startTransition(async () => {
      const result = await addIntegrante(proyectoId, form);
      toast.fromResult(result, "Integrante agregado");
      if (result.ok) formRef.current?.reset();
    });

  const onRemove = (perfilId: string) =>
    startTransition(async () => toast.fromResult(await removeIntegrante(proyectoId, perfilId), "Integrante quitado"));

  return (
    <Modal open onClose={onClose} title={`Equipo · ${proyecto.nombre}`}>
      <div className="flex flex-col gap-5">
        {proyecto.miembros.length === 0 ? (
          <p className="font-mono text-sm text-text-muted">{"// Aún no hay integrantes"}</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {proyecto.miembros.map((m) => (
              <li key={m.perfil_id} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-surface-2">
                <Avatar name={m.perfil.nombre} src={m.perfil.avatar_url} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{m.perfil.nombre}</span>
                  <span className="block text-xs text-text-muted">{m.funcion ?? "integrante"}</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => onRemove(m.perfil_id)}
                  aria-label={`Quitar a ${m.perfil.nombre}`}
                  className="hover:text-danger"
                >
                  <UserMinus className="size-4" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <form ref={formRef} action={onAdd} className="flex flex-col gap-3 border-t border-border pt-4">
          <p className="font-mono text-xs text-primary">{"// agregar integrante"}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Miembro"
              name="perfil_id"
              options={miembros.filter((o) => !enEquipo.has(o.value))}
              placeholder="Elige un miembro"
              required
            />
            <Input label="Función" name="funcion" placeholder="frontend, backend..." maxLength={60} />
          </div>
          <Button type="submit" size="sm" loading={pending} className="self-end">
            Agregar
          </Button>
        </form>
      </div>
    </Modal>
  );
}
