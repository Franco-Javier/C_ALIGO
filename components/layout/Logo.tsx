import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="C_ALIGO, ir al inicio">
      <Image src="/logo.svg" alt="" width={32} height={32} priority />
      <span className="font-display text-lg font-bold tracking-tight">
        C<span className="text-primary">_</span>ALIGO
      </span>
    </Link>
  );
}
