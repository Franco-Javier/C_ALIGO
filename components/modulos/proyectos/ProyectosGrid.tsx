import type { ProyectoConEquipo } from "@/types/database";
import { ProyectoCard } from "./ProyectoCard";

export function ProyectosGrid({ proyectos }: { proyectos: ProyectoConEquipo[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {proyectos.map((proyecto) => (
        <li key={proyecto.id} className="flex [&>a]:flex-1">
          <ProyectoCard proyecto={proyecto} />
        </li>
      ))}
    </ul>
  );
}
