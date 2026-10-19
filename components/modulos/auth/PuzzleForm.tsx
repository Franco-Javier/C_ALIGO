"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ActionResult } from "@/lib/actions/types";
import { PUZZLE } from "@/lib/puzzle";

/** Envía la respuesta a POST /api/puzzle; si es correcta, va a completar el perfil. */
export function PuzzleForm() {
  const router = useRouter();
  const [respuesta, setRespuesta] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/puzzle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuesta }),
      });
      const result = (await res.json()) as ActionResult;
      if (result.ok) {
        router.push("/perfil/editar?bienvenida=1");
        router.refresh();
        return;
      }
      setError(result.error);
    } catch {
      setError("No se pudo enviar tu respuesta. Revisa tu conexión.");
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Respuesta"
        name="respuesta"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        hint={error ? undefined : PUZZLE.ayuda}
        error={error ? `✖ ${error}` : undefined}
        autoComplete="off"
        spellCheck={false}
        required
        className="font-mono"
      />
      <Button type="submit" loading={pending} className="self-start">
        Enviar
      </Button>
    </form>
  );
}
