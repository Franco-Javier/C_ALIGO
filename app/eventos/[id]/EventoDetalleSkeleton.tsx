import { Skeleton } from "@/components/ui/Skeleton";

export function EventoDetalleSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-2 lg:col-span-2">
          <Skeleton className="mb-2 h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  );
}
