import { FormSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5" aria-busy="true" aria-label="Cargando">
      <Skeleton className="h-9 w-56" />
      <div className="rounded-xl border border-border bg-surface p-6">
        <FormSkeleton />
      </div>
    </div>
  );
}
