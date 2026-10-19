import { Suspense, type ReactNode } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";

type AdminPageProps = { title: string; description?: string; children: ReactNode };

/** Encabezado de cada sección del admin; el contenido (que lee la sesión) va en Suspense. */
export function AdminPage({ title, description, children }: AdminPageProps) {
  return (
    <div>
      <SectionTitle className="mb-1">{title}</SectionTitle>
      {description && <p className="mb-5 text-sm text-text-muted">{description}</p>}
      <Suspense
        fallback={
          <div className="flex flex-col gap-4" aria-hidden>
            <Skeleton className="h-10 w-36 self-end" />
            <Skeleton className="h-72 rounded-xl" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
