"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { MensajeConAutor } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { borrarMensaje, editarMensaje } from "@/lib/actions/foros";
import { formatDate, formatTime } from "@/lib/utils";

type MensajeItemProps = { mensaje: MensajeConAutor; puedeEditar: boolean; puedeBorrar: boolean };

const ICON_BTN = "rounded p-1 text-text-muted transition hover:bg-surface-2 hover:text-text";

export function MensajeItem({ mensaje, puedeEditar, puedeBorrar }: MensajeItemProps) {
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const autor = mensaje.autor;

  function onEdit(form: FormData) {
    startTransition(async () => {
      const result = await editarMensaje(mensaje.id, form);
      toast.fromResult(result);
      if (result.ok) setEditing(false);
    });
  }

  function onDelete() {
    startTransition(async () => {
      const result = await borrarMensaje(mensaje.id);
      toast.fromResult(result, "Mensaje borrado");
      setConfirming(false);
    });
  }

  return (
    <li className="group flex gap-3 rounded-lg px-2 py-2 hover:bg-surface-2/50">
      <Avatar name={autor?.nombre ?? "?"} src={autor?.avatar_url} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {autor?.usuario_github ? (
            <Link href={`/perfil/${autor.usuario_github}`} className="truncate text-sm font-medium hover:text-primary">
              {autor.nombre}
            </Link>
          ) : (
            <span className="truncate text-sm font-medium">{autor?.nombre ?? "Miembro"}</span>
          )}
          {mensaje.creado_en && (
            <span className="shrink-0 font-mono text-[11px] text-text-muted">
              {formatDate(mensaje.creado_en)} · {formatTime(mensaje.creado_en)}
            </span>
          )}
          {mensaje.editado_en && <span className="font-mono text-[11px] text-text-muted">(editado)</span>}
          <span className="ml-auto flex gap-0.5 opacity-100 transition lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
            {puedeEditar && !editing && (
              <button type="button" className={ICON_BTN} onClick={() => setEditing(true)} aria-label="Editar mensaje">
                <Pencil className="size-3.5" aria-hidden />
              </button>
            )}
            {puedeBorrar && (
              <button
                type="button"
                className={`${ICON_BTN} hover:text-danger`}
                onClick={() => setConfirming(true)}
                aria-label="Borrar mensaje"
              >
                <Trash2 className="size-3.5" aria-hidden />
              </button>
            )}
          </span>
        </div>
        {editing ? (
          <form action={onEdit} className="mt-2 flex flex-col gap-2">
            <Textarea label="Editar mensaje" hideLabel name="contenido" defaultValue={mensaje.contenido} rows={3} required maxLength={2000} />
            <div className="flex gap-2">
              <Button type="submit" size="sm" loading={pending}>
                Guardar
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)} disabled={pending}>
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <p className="whitespace-pre-line break-words text-sm text-text/90">{mensaje.contenido}</p>
        )}
      </div>
      <ConfirmDialog
        open={confirming}
        onClose={() => setConfirming(false)}
        onConfirm={onDelete}
        loading={pending}
        title="Borrar mensaje"
        message="El mensaje se borrará para todos. Esta acción no se puede deshacer."
        confirmLabel="Borrar"
      />
    </li>
  );
}
