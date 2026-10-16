"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_ITEM, MOBILE_MORE, MOBILE_PRIMARY, isActive } from "./nav-items";

const TAB = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 font-display text-[11px] transition";

export function MobileNavBar({ esDirectiva }: { esDirectiva: boolean }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const moreItems = esDirectiva ? [...MOBILE_MORE, ADMIN_ITEM] : MOBILE_MORE;
  const moreActive = moreItems.some((item) => isActive(pathname, item.href));

  // Cerrar al navegar.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMoreOpen(false);
  }

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <nav
      ref={rootRef}
      aria-label="Navegación móvil"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden"
    >
      {moreOpen && (
        <ul
          id="mobile-more-menu"
          className="absolute inset-x-3 bottom-full mb-2 grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-2 shadow-2xl"
        >
          {moreItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm transition hover:bg-surface-2",
                    active ? "text-primary" : "text-text",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <ul className="flex h-16">
        {MOBILE_PRIMARY.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(TAB, active ? "text-primary" : "text-text-muted")}
              >
                <Icon className="size-5" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1">
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            aria-controls="mobile-more-menu"
            className={cn(TAB, moreOpen || moreActive ? "text-primary" : "text-text-muted")}
          >
            <MoreHorizontal className="size-5" aria-hidden />
            Más
          </button>
        </li>
      </ul>
    </nav>
  );
}
