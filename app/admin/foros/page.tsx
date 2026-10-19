import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { ForosAdmin } from "@/components/modulos/admin/ForosAdmin";
import { HilosFijados } from "@/components/modulos/admin/HilosFijados";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { requireDirectiva } from "@/lib/auth/guards";
import { getForos, getHilosAdmin } from "@/lib/data/foros";

export const metadata: Metadata = { title: "Foros" };

async function ForosContent() {
  await requireDirectiva();
  const [foros, hilos] = await Promise.all([getForos(), getHilosAdmin()]);

  return (
    <div className="flex flex-col gap-10">
      <ForosAdmin foros={foros} />
      <section>
        <SectionTitle className="mb-1">Hilos</SectionTitle>
        <p className="mb-4 text-sm text-text-muted">Los hilos fijados aparecen primero en su foro.</p>
        <HilosFijados hilos={hilos} foros={foros} />
      </section>
    </div>
  );
}

export default function AdminForosPage() {
  return (
    <AdminPage title="Foros" description="Foros generales y subforos (un nivel). Ordénalos con el campo Orden.">
      <ForosContent />
    </AdminPage>
  );
}
