import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackLinkProps = { href: string; children: string; className?: string };

/** "← eventos": vuelve a la lista desde un detalle. */
export function BackLink({ href, children, className = "mb-6" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 self-start rounded font-mono text-xs text-text-muted transition hover:text-primary",
        className,
      )}
    >
      <ArrowLeft className="size-3.5" aria-hidden /> {children}
    </Link>
  );
}
