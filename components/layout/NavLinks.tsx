"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DESKTOP_NAV, isActive } from "./nav-items";

/** Enlaces del navbar de escritorio (en móvil se usa la barra inferior). */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {DESKTOP_NAV.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 font-display text-sm transition",
                  active ? "text-primary" : "text-text-muted hover:text-text",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
