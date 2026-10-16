import { ProyectoCard } from "@/components/modulos/proyectos/ProyectoCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProyectos } from "@/lib/data/proyectos";

export async function ProyectosActivosSection() {
  const proyectos = await getProyectos({ estado: "en_progreso" });

  if (proyectos.length === 0) return <EmptyState message="Aún no hay proyectos en progreso" />;

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
