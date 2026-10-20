import type { Metadata } from "next";
import { Suspense } from "react";
import { MockLoginPanel } from "@/components/modulos/auth/MockLoginPanel";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Card } from "@/components/ui/Card";
import { LogoMark, Wordmark } from "@/components/ui/LogoMark";
import { Skeleton } from "@/components/ui/Skeleton";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { signInWithGithub } from "@/lib/actions/auth";
import { requireVisitante } from "@/lib/auth/guards";
import { isMockMode } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entra a C_ALIGO con tu cuenta de GitHub.",
};

async function LoginActions({ searchParams }: PageProps<"/login">) {
  await requireVisitante();
  const { error } = await searchParams;

  return (
    <>
      {error && (
        <p role="alert" className="text-sm text-danger">
          ✖ No se pudo iniciar sesión con GitHub. Intenta de nuevo.
        </p>
      )}
      <form action={signInWithGithub} className="w-full">
        <SubmitButton size="lg" className="w-full">
          <GithubIcon className="size-5" /> Continuar con GitHub
        </SubmitButton>
      </form>
      {isMockMode && <MockLoginPanel />}
    </>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <div className="flex justify-center py-6 sm:py-12">
      <Card className="flex w-full max-w-sm flex-col items-center gap-5 p-6 text-center sm:p-8">
        <LogoMark className="size-20 drop-shadow-[0_0_18px_var(--primary-glow)]" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl">
            <Wordmark />
          </h1>
          <p className="brand-label text-xs tracking-[0.45em] text-primary">caligo.lab</p>
        </div>
        <p className="text-text-muted">Entra con tu cuenta de GitHub</p>
        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
          <LoginActions {...props} />
        </Suspense>
        <p className="font-mono text-xs text-text-muted">
          <span className="text-primary">{"// "}</span>Al entrar deberás resolver un puzzle
        </p>
      </Card>
    </div>
  );
}
