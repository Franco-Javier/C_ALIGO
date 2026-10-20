import { cn } from "@/lib/utils";

/** Isotipo de C_ALIGO (C angular con destello). Usa currentColor: el color se da con text-*. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden className={cn("text-primary", className)}>
      <path d="M21 4H59L47 16H28L18 32L28 48H35L42 60H21L5 34V30Z" />
      <path d="M39 48H51L59 60H46Z" />
      <path d="M39 21L41.2 29.8L50 32L41.2 34.2L39 43L36.8 34.2L28 32L36.8 29.8Z" />
    </svg>
  );
}

/** Logotipo "C_ALIGO" con el guion bajo en verde. */
export function Wordmark({ className, blink = false }: { className?: string; blink?: boolean }) {
  return (
    <span className={cn("font-brand uppercase leading-none", className)}>
      C
      <span className={cn("text-primary", blink && "cursor-blink")}>_</span>
      ALIGO
    </span>
  );
}
