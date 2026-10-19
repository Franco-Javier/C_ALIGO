import { Skeleton } from "@/components/ui/Skeleton";
import { MiembrosSkeleton } from "./MiembrosSkeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <Skeleton className="mb-2 h-9 w-48" />
      <Skeleton className="mb-6 h-4 w-56" />
      <MiembrosSkeleton />
    </div>
  );
}
