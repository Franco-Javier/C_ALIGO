import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = { header: string; cell: (row: T) => ReactNode; className?: string };

/** Tabla del panel admin. En móvil hace scroll horizontal dentro de la tarjeta. */
export function AdminTable<T extends { id: string }>({ rows, columns }: { rows: T[]; columns: Column<T>[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.header}
                scope="col"
                className={cn("px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-text-muted", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.id} className="transition hover:bg-surface-2/50">
              {columns.map((col) => (
                <td key={col.header} className={cn("px-4 py-2.5 align-middle", col.className)}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
