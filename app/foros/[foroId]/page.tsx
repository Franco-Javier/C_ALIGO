import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HilosList } from "@/components/modulos/foros/HilosList";
import { NuevoHiloButton } from "@/components/modulos/foros/NuevoHiloButton";
import { BackLink } from "@/components/ui/BackLink";
import { Skeleton } from "@/components/ui/Skeleton";
import { requireMiembro } from "@/lib/auth/guards";
import { getForoById, getForos, getHilos } from "@/lib/data/foros";
import { isUuid } from "@/lib/utils";

export const metadata: Metadata = { title: "Foro" };

async function ForoContent({ params }: PageProps<"/foros/[foroId]">) {
  const [{ foroId }] = await Promise.all([params, requireMiembro()]);
  if (!isUuid(foroId)) notFound();

  const [foro, hilos, foros] = await Promise.all([getForoById(foroId), getHilos(foroId), getForos()]);
  if (!foro) notFound();
  const padre = foros.find((f) => f.id === foro.foro_padre_id);
  const subforos = foros.filter((f) => f.foro_padre_id === foro.id);

  return (
    <div className="flex flex-col gap-5">
      <BackLink href={padre ? `/foros/${padre.id}` : "/foros"} className="">
        {padre ? `#${padre.nombre}` : "foros"}
      </BackLink>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold">
            <span className="font-mono text-primary">#</span> {foro.nombre}
          </h1>
          {foro.descripcion && <p className="text-sm text-text-muted">{foro.descripcion}</p>}
        </div>
        <NuevoHiloButton foroId={foro.id} />
      </header>
      {subforos.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {subforos.map((s) => (
            <li key={s.id}>
              <Link
                href={`/foros/${s.id}`}
                className="inline-flex h-8 items-center rounded-lg border border-border bg-surface px-3 font-mono text-sm text-text-muted transition hover:border-primary hover:text-text"
              >
                └ #{s.nombre}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <HilosList foroId={foro.id} hilos={hilos} />
    </div>
  );
}

export default function ForoPage(props: PageProps<"/foros/[foroId]">) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-5" aria-hidden>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      }
    >
      <ForoContent {...props} />
    </Suspense>
  );
}
