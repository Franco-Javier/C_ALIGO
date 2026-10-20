import { cn } from "@/lib/utils";

/** Divisor de la marca: barra gruesa, rayas diagonales y línea fina (▬▬ //// ——). */
export function BrandDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-1.5", className)}>
      <span className="h-1.5 w-16 rounded-full bg-primary sm:w-24" />
      <span className="h-1.5 w-10 bg-[repeating-linear-gradient(-60deg,var(--primary)_0_3px,transparent_3px_7px)]" />
      <span className="h-px flex-1 bg-primary/60" />
    </div>
  );
}
