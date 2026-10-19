import { Skeleton } from "@/components/ui/Skeleton";

export function PerfilSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden>
      <div className="flex flex-col items-center gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-start">
        <Skeleton className="size-28 rounded-full" />
        <div className="flex w-full flex-1 flex-col items-center gap-3 sm:items-start">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
