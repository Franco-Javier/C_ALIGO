import { Plus } from "lucide-react";
import { ButtonLink } from "./Button";

/** Acción de los estados vacíos para la directiva: lleva a la sección del panel admin. */
export function NewButton({ href, children }: { href: string; children: string }) {
  return (
    <ButtonLink href={href} size="sm">
      <Plus className="size-4" aria-hidden /> {children}
    </ButtonLink>
  );
}
