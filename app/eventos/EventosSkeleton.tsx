import { Skeleton } from "@/components/ui/Skeleton";

function EventoCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-surface p-4">
      <Skeleton className="h-16 w-12" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-2 h-8 w-24" />
      </div>
    </div>
  );
}

export function EventosSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <Skeleton className="h-8 w-full max-w-md" />
        <Skeleton className="h-8 w-44" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <EventoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
