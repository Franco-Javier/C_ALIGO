"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Botones de acción, alineados a la derecha. */
  footer?: ReactNode;
  size?: "md" | "lg" | "xl";
};

const SIZES = { md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

/**
 * Modal sobre <dialog> nativo: trae foco atrapado, Escape y capa superior.
 * Se cierra con Escape, con la X o al hacer clic en el fondo.
 */
export function Modal({ open, onClose, title, children, footer, size = "md" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] rounded-xl border border-border bg-surface p-0 text-text",
        "max-h-[calc(100dvh-2rem)]",
        SIZES[size],
      )}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 id={titleId} className="font-display text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg p-1.5 text-text-muted transition hover:bg-surface-2 hover:text-text"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <footer className="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  );
}
