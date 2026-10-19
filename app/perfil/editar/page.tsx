import type { Metadata } from "next";
import { Suspense } from "react";
import { EditarPerfilForm } from "@/components/modulos/perfil/EditarPerfilForm";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FormSkeleton } from "@/components/ui/Skeleton";
import { requireMiembro } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Editar perfil" };

async function EditarPerfilContent({ searchParams }: PageProps<"/perfil/editar">) {
  const [user, { bienvenida }] = await Promise.all([requireMiembro(), searchParams]);

  return (
    <>
      {bienvenida && (
        <p className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
          <span className="font-mono text-primary">✔ Reto superado.</span> Bienvenido a C_ALIGO,
          completa tu perfil para que la comunidad te conozca.
        </p>
      )}
      <EditarPerfilForm perfil={user} />
    </>
  );
}

export default function EditarPerfilPage(props: PageProps<"/perfil/editar">) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5">
      <SectionTitle as="h1" prefix=">_" className="mb-0">
        Editar perfil
      </SectionTitle>
      <Card className="flex flex-col gap-5 p-5 sm:p-6">
        <Suspense fallback={<FormSkeleton />}>
          <EditarPerfilContent {...props} />
        </Suspense>
      </Card>
    </div>
  );
}
