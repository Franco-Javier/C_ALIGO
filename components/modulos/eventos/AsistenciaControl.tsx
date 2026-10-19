import { ButtonLink } from "@/components/ui/Button";
import type { Viewer } from "@/lib/labels";
import { AsistentesCount, AsistireButton } from "./AsistireButton";

type AsistenciaControlProps = {
  eventoId: string;
  viewer: Viewer;
  proximo: boolean;
  asistire: boolean;
  count: number;
};

/**
 * Qué ve cada quien bajo un evento:
 * - Miembro: botón "Asistiré" y conteo (RLS solo le deja ver asistentes a miembros).
 * - Visitante / pendiente: "Asistiré" lleva a /login o /puzzle.
 * - Evento pasado: solo "Finalizado" (y el conteo para miembros).
 */
export function AsistenciaControl({ eventoId, viewer, proximo, asistire, count }: AsistenciaControlProps) {
  if (!proximo) {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-text-muted">{"// Finalizado"}</span>
        {viewer === "miembro" && <AsistentesCount count={count} />}
      </div>
    );
  }

  if (viewer === "miembro") {
    return <AsistireButton eventoId={eventoId} asistire={asistire} count={count} />;
  }

  return (
    <ButtonLink href={viewer === "visitante" ? "/login" : "/puzzle"} size="sm">
      Asistiré
    </ButtonLink>
  );
}
