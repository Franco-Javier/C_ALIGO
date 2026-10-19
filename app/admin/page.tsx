import Link from "next/link";
import { connection } from "next/server";
import { AdminPage } from "@/components/modulos/admin/AdminPage";
import { AdminTable } from "@/components/modulos/admin/AdminTable";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, RolBadge } from "@/components/ui/Badge";
import { requireDirectiva } from "@/lib/auth/guards";
import { getResumenAdmin } from "@/lib/data/admin";
import { ESTADO_USUARIO_LABEL } from "@/lib/labels";
import { formatDate } from "@/lib/utils";

const ESTADO_TONE = { activo: "primary", pendiente: "warning", inactivo: "neutral" } as const;

async function Resumen() {
  await requireDirectiva();
  await connection(); // "eventos del mes" depende de la fecha actual
  const { porEstado, proyectos, eventosMes, ultimosRegistros } = await getResumenAdmin();

  const stats = [
    { label: "Miembros activos", value: porEstado.activo, href: "/admin/miembros" },
    { label: "Pendientes", value: porEstado.pendiente, href: "/admin/miembros" },
    { label: "Inactivos", value: porEstado.inactivo, href: "/admin/miembros" },
    { label: "Proyectos", value: proyectos, href: "/admin/proyectos" },
    { label: "Eventos este mes", value: eventosMes, href: "/admin/eventos" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              className="flex h-full flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition hover:border-primary"
            >
              <span className="font-mono text-3xl font-bold text-primary">{s.value}</span>
              <span className="text-xs text-text-muted">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section>
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-text-muted">
          Últimos registros
        </h2>
        <AdminTable
          rows={ultimosRegistros}
          columns={[
            {
              header: "Miembro",
              cell: (p) => (
                <span className="flex items-center gap-2">
                  <Avatar name={p.nombre} src={p.avatar_url} size="xs" />
                  <span className="truncate">{p.nombre}</span>
                </span>
              ),
            },
            { header: "GitHub", cell: (p) => <span className="font-mono text-xs text-primary">@{p.usuario_github}</span> },
            { header: "Rol", cell: (p) => <RolBadge rol={p.rol} /> },
            { header: "Estado", cell: (p) => <Badge tone={ESTADO_TONE[p.estado]}>{ESTADO_USUARIO_LABEL[p.estado]}</Badge> },
            { header: "Registro", cell: (p) => (p.creado_en ? formatDate(p.creado_en) : "—") },
          ]}
        />
      </section>
    </div>
  );
}

export default function AdminResumenPage() {
  return (
    <AdminPage title="Resumen">
      <Resumen />
    </AdminPage>
  );
}
