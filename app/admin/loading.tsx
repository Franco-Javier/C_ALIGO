import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Cargando">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-10 w-36 self-end" />
      <Skeleton className="h-72 rounded-xl" />
    </div>
  );
}
