import type { ProyectoConEquipo } from "@/types/database";
import { PerfilLink } from "@/components/modulos/perfil/PerfilLink";

/** // EQUIPO: integrantes con su función. */
export function ProyectoEquipo({ miembros }: { miembros: ProyectoConEquipo["miembros"] }) {
  if (miembros.length === 0) {
    return <p className="font-mono text-sm text-text-muted">{"// Aún no hay integrantes"}</p>;
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {miembros.map((m) => (
        <li key={m.perfil_id} className="rounded-xl border border-border bg-surface p-1.5">
          <PerfilLink perfil={m.perfil} detail={m.funcion ?? "integrante"} />
        </li>
      ))}
    </ul>
  );
}
