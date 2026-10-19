import { PerfilSkeleton } from "./PerfilSkeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <PerfilSkeleton />
    </div>
  );
}
