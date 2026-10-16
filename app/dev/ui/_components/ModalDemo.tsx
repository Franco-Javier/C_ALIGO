"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export function ModalDemo() {
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => setFormOpen(true)}>Abrir formulario</Button>
      <Button variant="danger" onClick={() => setConfirmOpen(true)}>
        Confirmar eliminación
      </Button>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Nuevo evento"
        footer={
          <>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setFormOpen(false)}>Guardar</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Título" placeholder="Taller de Git y GitHub" />
          <Input label="Lugar" placeholder="Aula 3, UTP Coclé" />
        </div>
      </Modal>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="¿Eliminar evento?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-muted">Esta acción no se puede deshacer.</p>
      </Modal>
    </div>
  );
}
