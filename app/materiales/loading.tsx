import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Cargando">
      <Skeleton className="h-9 w-52" />
      <Skeleton className="h-10 w-full" />
      <div className="grid gap-3 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
