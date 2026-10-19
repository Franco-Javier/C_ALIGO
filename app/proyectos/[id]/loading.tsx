import { Skeleton } from "@/components/ui/Skeleton";
import { ProyectoDetalleSkeleton } from "./ProyectoDetalleSkeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <Skeleton className="mb-6 h-4 w-24" />
      <ProyectoDetalleSkeleton />
    </div>
  );
}
