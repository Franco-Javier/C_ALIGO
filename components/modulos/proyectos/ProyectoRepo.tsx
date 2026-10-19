import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

/**
 * // REPOSITORIO. Por ahora solo el enlace; los datos del repo (lenguaje, estrellas,
 * últimos commits) llegan con la integración de la GitHub API (Fase 3).
 */
export function ProyectoRepo({ repo }: { repo: string | null }) {
  if (!repo) {
    return <p className="font-mono text-sm text-text-muted">{"// Este proyecto aún no tiene repositorio"}</p>;
  }

  return (
    <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
      <span className="flex min-w-0 items-center gap-2 font-mono text-sm">
        <GithubIcon className="size-4 shrink-0 text-text-muted" />
        <span className="truncate">{repo}</span>
      </span>
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles({ variant: "secondary", size: "sm" })}
      >
        Abrir GitHub <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(abre en una pestaña nueva)</span>
      </a>
    </Card>
  );
}
