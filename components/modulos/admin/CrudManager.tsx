"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import type { ActionResult } from "@/lib/actions/types";
import { AdminTable, type Column } from "./AdminTable";

type CrudManagerProps<T extends { id: string }> = {
  /** En singular y minúsculas: "evento" → "Nuevo evento", "Editar evento". */
  entity: string;
  /** Género gramatical para "Nuevo/Nueva". */
  feminine?: boolean;
  rows: T[];
  columns: Column<T>[];
  /** Campos del formulario; `row` es null al crear. */
  renderForm: (row: T | null) => ReactNode;
  save: (id: string | null, form: FormData) => Promise<ActionResult>;
  /** Sin `remove` no hay botón de eliminar (ej. miembros: nunca se eliminan). */
  remove?: (id: string) => Promise<ActionResult>;
  deleteMessage?: (row: T) => string;
  /** Sin `allowCreate` no hay botón "Nuevo". */
  allowCreate?: boolean;
  /** Acciones extra por fila (ej. "Equipo", "Otorgar"). */
  rowActions?: (row: T) => ReactNode;
  modalSize?: "md" | "lg";
};

/** Sección del admin: tabla + "Nuevo" + modal de formulario (crear/editar) + eliminar con confirmación. */
export function CrudManager<T extends { id: string }>({
  entity,
  feminine,
  rows,
  columns,
  renderForm,
  save,
  remove,
  deleteMessage,
  allowCreate = true,
  rowActions,
  modalSize = "md",
}: CrudManagerProps<T>) {
  const toast = useToast();
  const [editing, setEditing] = useState<T | "new" | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);
  const [pending, startTransition] = useTransition();
  const nuevo = `${feminine ? "Nueva" : "Nuevo"} ${entity}`;
  const formId = `form-${entity.replace(/\s+/g, "-")}`;

  function onSubmit(form: FormData) {
    const id = editing && editing !== "new" ? editing.id : null;
    startTransition(async () => {
      const result = await save(id, form);
      toast.fromResult(result, id ? "Cambios guardados" : `${nuevo} creado${feminine ? "a" : ""}`);
      if (result.ok) setEditing(null);
    });
  }

  function onDelete() {
    if (!deleting || !remove) return;
    startTransition(async () => {
      const result = await remove(deleting.id);
      toast.fromResult(result, "Eliminado");
      setDeleting(null);
    });
  }

  const actionsColumn: Column<T> = {
    header: "Acciones",
    className: "w-px whitespace-nowrap text-right",
    cell: (row) => (
      <div className="flex justify-end gap-1">
        {rowActions?.(row)}
        <Button size="sm" variant="ghost" onClick={() => setEditing(row)} aria-label="Editar">
          <Pencil className="size-4" aria-hidden />
        </Button>
        {remove && (
          <Button size="sm" variant="ghost" onClick={() => setDeleting(row)} aria-label="Eliminar" className="hover:text-danger">
            <Trash2 className="size-4" aria-hidden />
          </Button>
        )}
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-4">
      {allowCreate && (
        <Button className="self-end" onClick={() => setEditing("new")}>
          <Plus className="size-4" aria-hidden /> {nuevo}
        </Button>
      )}

      {rows.length === 0 ? (
        <EmptyState message={`Aún no hay registros de ${entity}`} />
      ) : (
        <AdminTable rows={rows} columns={[...columns, actionsColumn]} />
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? nuevo : `Editar ${entity}`}
        size={modalSize}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditing(null)} disabled={pending}>
              Cancelar
            </Button>
            <Button type="submit" form={formId} loading={pending}>
              Guardar
            </Button>
          </>
        }
      >
        {/* key: al cambiar de fila se reinician los defaultValue del formulario */}
        {editing !== null && (
          <form key={editing === "new" ? "new" : editing.id} id={formId} action={onSubmit} className="flex flex-col gap-4">
            {renderForm(editing === "new" ? null : editing)}
          </form>
        )}
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={onDelete}
        loading={pending}
        title={`Eliminar ${entity}`}
        message={deleting && deleteMessage ? deleteMessage(deleting) : "Esta acción no se puede deshacer."}
      />
    </div>
  );
}
