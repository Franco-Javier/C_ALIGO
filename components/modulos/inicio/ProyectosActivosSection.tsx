import { ProyectosGrid } from "@/components/modulos/proyectos/ProyectosGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProyectos } from "@/lib/data/proyectos";

export async function ProyectosActivosSection() {
  const proyectos = await getProyectos({ estado: "en_progreso" });

  if (proyectos.length === 0) return <EmptyState message="Aún no hay proyectos en progreso" />;
  return <ProyectosGrid proyectos={proyectos} />;
}
