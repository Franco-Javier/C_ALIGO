import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export function ImpactoSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <div className="flex gap-2">
        {[64, 88, 72, 96, 56, 64].map((w, i) => (
          <Skeleton key={i} className="h-8" style={{ width: w }} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
