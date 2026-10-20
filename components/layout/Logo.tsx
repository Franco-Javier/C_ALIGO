import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/ui/LogoMark";

/** Lockup horizontal: isotipo | C_ALIGO / CALIGO.LAB */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-lg" aria-label="C_ALIGO, ir al inicio">
      <LogoMark className="size-8" />
      <span aria-hidden className="h-7 w-px bg-primary/50" />
      <span className="flex flex-col gap-1">
        <Wordmark className="text-lg" />
        <span className="brand-label text-[8px] leading-none tracking-[0.42em] text-primary">caligo.lab</span>
      </span>
    </Link>
  );
}
