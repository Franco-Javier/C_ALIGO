import { Skeleton } from "@/components/ui/Skeleton";

export function HerramientasSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden>
      {[0, 1].map((group) => (
        <div key={group}>
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-44 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
