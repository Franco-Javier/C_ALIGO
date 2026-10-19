import { Skeleton } from "@/components/ui/Skeleton";
import { getCurrentUser } from "@/lib/data/session";
import { getContadores } from "@/lib/data/stats";
import { puedeVerReuniones, viewerOf } from "@/lib/labels";

const GRID = "grid grid-cols-3 gap-3";
const ITEM =
  "flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-4 font-mono sm:flex-row sm:justify-center sm:gap-2 sm:py-5";

export async function Contadores() {
  const user = await getCurrentUser();
  const { miembros, proyectos, eventos } = await getContadores({
    incluirReuniones: puedeVerReuniones(viewerOf(user)),
  });
  const items = [
    { value: miembros, label: "miembros" },
    { value: proyectos, label: "proyectos" },
    { value: eventos, label: "eventos" },
  ];

  return (
    <section aria-label="La comunidad en números" className={GRID}>
      {items.map(({ value, label }) => (
        <div key={label} className={ITEM}>
          <span className="hidden text-text-muted sm:inline" aria-hidden>[</span>
          <span className="text-2xl font-bold text-primary sm:text-3xl">{value}</span>
          <span className="text-xs text-text-muted sm:text-sm">{label}</span>
          <span className="hidden text-text-muted sm:inline" aria-hidden>]</span>
        </div>
      ))}
    </section>
  );
}

export function ContadoresSkeleton() {
  return (
    <div className={GRID}>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-[76px] rounded-xl sm:h-[78px]" />
      ))}
    </div>
  );
}
