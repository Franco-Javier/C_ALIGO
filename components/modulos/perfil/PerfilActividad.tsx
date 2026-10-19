import Link from "next/link";
import type { ActividadPerfil } from "@/lib/data/perfiles";
import type { Viewer } from "@/lib/labels";

type PerfilActividadProps = { actividad: ActividadPerfil | null; viewer: Viewer };

/**
 * // ACTIVIDAD. Los conteos solo se muestran a miembros (RLS).
 * Los repos públicos llegan con la integración de la GitHub API (Fase 3).
 */
export function PerfilActividad({ actividad, viewer }: PerfilActividadProps) {
  if (!actividad) {
    return (
      <p className="font-mono text-sm text-text-muted">
        {"// "}
        <Link href={viewer === "visitante" ? "/login" : "/puzzle"} className="text-primary hover:underline">
          {viewer === "visitante" ? "Entra" : "Resuelve el reto"}
        </Link>{" "}
        para ver la actividad en la comunidad
      </p>
    );
  }

  const items = [
    { value: actividad.eventos, label: "Eventos asistidos" },
    { value: actividad.mensajes, label: "Mensajes" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:max-w-md">
      {items.map(({ value, label }) => (
        <div key={label} className="rounded-xl border border-border bg-surface px-4 py-3">
          <dt className="text-xs text-text-muted">{label}</dt>
          <dd className="font-mono text-2xl font-bold text-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
