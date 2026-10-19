import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** "← eventos": vuelve a la lista desde un detalle. */
export function BackLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-1.5 rounded font-mono text-xs text-text-muted transition hover:text-primary"
    >
      <ArrowLeft className="size-3.5" aria-hidden /> {children}
    </Link>
  );
}
