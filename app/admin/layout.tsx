import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminNav } from "@/components/modulos/admin/AdminNav";

export const metadata: Metadata = { title: { default: "Admin", template: "%s · Admin · C_ALIGO" } };

/**
 * Panel de directiva (§7.13). La navegación no lee la sesión; cada página
 * verifica el rol con requireDirectiva() (redirección o 403).
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[200px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 hidden font-mono text-xs text-primary lg:block">{"// panel admin"}</p>
        <AdminNav />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
