import { Skeleton } from "@/components/ui/Skeleton";

export function ProyectoDetalleSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <Skeleton className="aspect-[3/1] w-full rounded-none" />
        <div className="flex flex-col gap-3 p-6">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-14 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-16 rounded-xl" />
    </div>
  );
}
