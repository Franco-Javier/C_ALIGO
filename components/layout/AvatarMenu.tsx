"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Pencil, ShieldCheck, User } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

type AvatarMenuProps = {
  nombre: string;
  usuarioGithub: string | null;
  avatarUrl: string | null;
  esDirectiva: boolean;
};

const ITEM =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-text-muted transition hover:bg-surface-2 hover:text-text";

export function AvatarMenu({ nombre, usuarioGithub, avatarUrl, esDirectiva }: AvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Cerrar al navegar.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Cerrar con clic fuera o Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Menú de usuario"
        className="flex items-center gap-1 rounded-full p-0.5 transition hover:bg-surface-2"
      >
        <Avatar name={nombre} src={avatarUrl} size="sm" />
        <ChevronDown
          className={cn("size-4 text-text-muted transition", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-surface p-1.5 shadow-2xl"
        >
          <div className="border-b border-border px-3 pb-2.5 pt-1.5">
            <p className="truncate text-sm font-medium">{nombre}</p>
            {usuarioGithub && (
              <p className="truncate font-mono text-xs text-primary">@{usuarioGithub}</p>
            )}
          </div>
          <div className="pt-1.5">
            {usuarioGithub && (
              <Link role="menuitem" href={`/perfil/${usuarioGithub}`} className={ITEM}>
                <User className="size-4" aria-hidden /> Mi perfil
              </Link>
            )}
            <Link role="menuitem" href="/perfil/editar" className={ITEM}>
              <Pencil className="size-4" aria-hidden /> Editar perfil
            </Link>
            {esDirectiva && (
              <Link role="menuitem" href="/admin" className={ITEM}>
                <ShieldCheck className="size-4" aria-hidden /> Panel admin
              </Link>
            )}
            <form action={signOut}>
              <button role="menuitem" type="submit" className={cn(ITEM, "hover:text-danger")}>
                <LogOut className="size-4" aria-hidden /> Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
