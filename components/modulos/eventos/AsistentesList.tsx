import Link from "next/link";
import type { PerfilResumen } from "@/types/database";
import { PerfilLink } from "@/components/modulos/perfil/PerfilLink";
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
      {asistentes.map((p) => (
        <li key={p.id}>
          <PerfilLink perfil={p} />
        </li>
      ))}
    </ul>
  );
}
