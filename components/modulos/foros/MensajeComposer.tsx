"use client";

import { useRef, useTransition, type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { enviarMensaje } from "@/lib/actions/foros";

/** [Escribe un mensaje...] [➤]. Enter envía; Shift+Enter hace salto de línea. */
export function MensajeComposer({ hiloId }: { hiloId: string }) {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(form: FormData) {
    startTransition(async () => {
      const result = await enviarMensaje(hiloId, form);
      if (!result.ok) return toast.error(result.error);
      formRef.current?.reset();
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form ref={formRef} action={onSubmit} className="flex items-end gap-2 border-t border-border p-3">
      <label htmlFor={`composer-${hiloId}`} className="sr-only">
        Escribe un mensaje
      </label>
      <textarea
        id={`composer-${hiloId}`}
        name="contenido"
        rows={1}
        required
        maxLength={2000}
        placeholder="Escribe un mensaje..."
        onKeyDown={onKeyDown}
        className="max-h-40 min-h-10 flex-1 resize-y rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm placeholder:text-text-muted/70 focus:border-primary focus:shadow-glow-sm focus:outline-none"
      />
      <Button type="submit" loading={pending} aria-label="Enviar mensaje" className="h-10 w-10 px-0">
        {!pending && <SendHorizontal className="size-4" aria-hidden />}
      </Button>
    </form>
  );
}
