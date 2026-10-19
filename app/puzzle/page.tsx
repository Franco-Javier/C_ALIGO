import type { Metadata } from "next";
import { Suspense } from "react";
import { PuzzleForm } from "@/components/modulos/auth/PuzzleForm";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { requirePendiente } from "@/lib/auth/guards";
import { PUZZLE } from "@/lib/puzzle";

export const metadata: Metadata = { title: "Reto de ingreso" };

async function PuzzleContent() {
  const user = await requirePendiente();

  return (
    <>
      <p className="text-sm text-text-muted">
        Hola, <span className="text-text">{user.nombre}</span>. Resuelve este reto para activar tu cuenta.
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-bg">
        <p className="border-b border-border px-4 py-2 font-mono text-xs text-primary">
          {"// "}
          {PUZZLE.pregunta}
        </p>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-sm">
          <code>{PUZZLE.codigo}</code>
        </pre>
      </div>
      <PuzzleForm />
    </>
  );
}

export default function PuzzlePage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5">
      <SectionTitle as="h1" prefix=">_" className="mb-0">
        Reto de ingreso
      </SectionTitle>
      <Card className="flex flex-col gap-5 p-5 sm:p-6">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4" aria-hidden>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          }
        >
          <PuzzleContent />
        </Suspense>
      </Card>
    </div>
  );
}
