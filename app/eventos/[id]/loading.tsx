import { Skeleton } from "@/components/ui/Skeleton";
import { EventoDetalleSkeleton } from "./EventoDetalleSkeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <Skeleton className="mb-6 h-4 w-20" />
      <EventoDetalleSkeleton />
    </div>
  );
}
