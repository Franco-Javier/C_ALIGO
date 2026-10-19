import type { Metadata } from "next";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { MiembrosAdmin } from "@/components/modulos/admin/MiembrosAdmin";
import { requireDirectiva } from "@/lib/auth/guards";
import { getPerfilesAdmin } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Miembros" };

async function MiembrosContent() {
  const user = await requireDirectiva();
  const perfiles = await getPerfilesAdmin();
  return <MiembrosAdmin perfiles={perfiles} userId={user.id} />;
}

export default function AdminMiembrosPage() {
  return (
    <AdminPage
      title="Miembros"
      description="Cambia rol, área y estado. A nadie se le elimina: quien no participa pasa a inactivo."
    >
      <MiembrosContent />
    </AdminPage>
  );
}
