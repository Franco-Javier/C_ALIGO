import { Skeleton } from "@/components/ui/Skeleton";
import { HerramientasSkeleton } from "./HerramientasSkeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <Skeleton className="mb-2 h-9 w-56" />
      <Skeleton className="mb-8 h-4 w-72" />
      <HerramientasSkeleton />
    </div>
  );
}
