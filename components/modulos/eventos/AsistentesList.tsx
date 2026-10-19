import Link from "next/link";
import type { PerfilResumen } from "@/types/database";
import { Avatar } from "@/components/ui/Avatar";
import type { Viewer } from "@/lib/labels";

type AsistentesListProps = { asistentes: PerfilResumen[]; viewer: Viewer; proximo: boolean };

/** Lista de asistentes. RLS solo deja verla a miembros. */
export function AsistentesList({ asistentes, viewer, proximo }: AsistentesListProps) {
  if (viewer !== "miembro") {
    return (
      <p className="font-mono text-sm text-text-muted">
        {"// "}
        {viewer === "visitante" ? (
          <>
            <Link href="/login" className="text-primary hover:underline">
              Entra
            </Link>{" "}
            para ver quién asiste
          </>
        ) : (
          <>
            <Link href="/puzzle" className="text-primary hover:underline">
              Resuelve el reto
            </Link>{" "}
            para ver quién asiste
          </>
        )}
      </p>
    );
  }

  if (asistentes.length === 0) {
    return (
      <p className="font-mono text-sm text-text-muted">
        {proximo ? "// Aún nadie se ha inscrito. ¡Sé el primero!" : "// Nadie marcó asistencia"}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {asistentes.map((p) => {
        const content = (
          <>
            <Avatar name={p.nombre} src={p.avatar_url} size="sm" />
            <span className="min-w-0">
              <span className="block truncate text-sm">{p.nombre}</span>
              {p.usuario_github && (
                <span className="block truncate font-mono text-xs text-primary">@{p.usuario_github}</span>
              )}
            </span>
          </>
        );
        return (
          <li key={p.id}>
            {p.usuario_github ? (
              <Link
                href={`/perfil/${p.usuario_github}`}
                className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-surface-2"
              >
                {content}
              </Link>
            ) : (
              <div className="flex items-center gap-3 p-1.5">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
