import { Skeleton } from "@/components/ui/Skeleton";
import { EventosSkeleton } from "./EventosSkeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <Skeleton className="mb-6 h-9 w-44" />
      <EventosSkeleton />
    </div>
  );
}
