"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import type { Foro } from "@/types/database";
import { foroTree } from "@/lib/foros";
import { cn } from "@/lib/utils";

function ForoLink({ foro, active, sub }: { foro: Foro; active: boolean; sub?: boolean }) {
  return (
    <Link
      href={`/foros/${foro.id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition",
        sub && "ml-3",
        active ? "bg-primary/15 text-primary" : "text-text-muted hover:bg-surface-2 hover:text-text",
      )}
    >
      <span className="font-mono text-primary/70" aria-hidden>
        {sub ? "└ #" : "#"}
      </span>
      <span className="truncate">{foro.nombre}</span>
    </Link>
  );
}

function ForosNavView({ foros, pathname }: { foros: Foro[]; pathname: string | null }) {
  const isActive = (id: string) => !!pathname?.startsWith(`/foros/${id}`);
  return (
    <nav aria-label="Foros">
      <ul className="flex flex-col gap-0.5">
        {foroTree(foros).map(({ foro, subforos }) => (
          <li key={foro.id}>
            <ForoLink foro={foro} active={isActive(foro.id)} />
            {subforos.length > 0 && (
              <ul className="mt-0.5 flex flex-col gap-0.5">
                {subforos.map((sub) => (
                  <li key={sub.id}>
                    <ForoLink foro={sub} active={isActive(sub.id)} sub />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ForosNavWithPath({ foros }: { foros: Foro[] }) {
  return <ForosNavView foros={foros} pathname={usePathname()} />;
}

/** Columna izquierda de los foros (escritorio). */
export function ForosNav({ foros }: { foros: Foro[] }) {
  return (
    <Suspense fallback={<ForosNavView foros={foros} pathname={null} />}>
      <ForosNavWithPath foros={foros} />
    </Suspense>
  );
}
