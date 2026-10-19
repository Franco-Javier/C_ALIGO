"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import {
  Award,
  Calendar,
  Camera,
  FolderGit2,
  LayoutDashboard,
  MessagesSquare,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/eventos", label: "Eventos", icon: Calendar },
  { href: "/admin/evidencias", label: "Evidencias", icon: Camera },
  { href: "/admin/proyectos", label: "Proyectos", icon: FolderGit2 },
  { href: "/admin/miembros", label: "Miembros", icon: Users },
  { href: "/admin/badges", label: "Badges", icon: Award },
  { href: "/admin/foros", label: "Foros", icon: MessagesSquare },
  { href: "/admin/herramientas", label: "Herramientas", icon: Wrench },
];

function AdminNavView({ pathname }: { pathname: string | null }) {
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : !!pathname?.startsWith(href);

  return (
    <nav aria-label="Panel admin" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
      <ul className="flex w-max gap-1 lg:w-auto lg:flex-col">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition",
                isActive(href) ? "bg-primary/15 text-primary" : "text-text-muted hover:bg-surface-2 hover:text-text",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AdminNavWithPath() {
  return <AdminNavView pathname={usePathname()} />;
}

/** Barra lateral del admin (en móvil, una fila con scroll horizontal). */
export function AdminNav() {
  return (
    <Suspense fallback={<AdminNavView pathname={null} />}>
      <AdminNavWithPath />
    </Suspense>
  );
}
