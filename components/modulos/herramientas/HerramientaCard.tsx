import Image from "next/image";
import { Download, Wrench } from "lucide-react";
import type { Herramienta } from "@/types/database";
import { buttonStyles } from "@/components/ui/Button";
import { cardStyles } from "@/components/ui/Card";

/** Toda la tarjeta es un enlace a la descarga, en una pestaña nueva (§7.8). */
export function HerramientaCard({ herramienta }: { herramienta: Herramienta }) {
  return (
    <a
      href={herramienta.url_descarga}
      target="_blank"
      rel="noopener noreferrer"
      className={cardStyles({
        interactive: true,
        className: "group flex h-full flex-col items-center gap-3 p-5 text-center",
      })}
    >
      <span className="flex size-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2 text-primary">
        {herramienta.icono_url ? (
          // unoptimized: el ícono puede venir de cualquier dominio.
          <Image src={herramienta.icono_url} alt="" width={56} height={56} unoptimized className="size-full object-contain p-2" />
        ) : (
          <Wrench className="size-6" aria-hidden />
        )}
      </span>
      <span className="font-display font-semibold">{herramienta.nombre}</span>
      {herramienta.descripcion && (
        <span className="line-clamp-2 text-xs text-text-muted">{herramienta.descripcion}</span>
      )}
      <span
        className={buttonStyles({
          variant: "secondary",
          size: "sm",
          className: "mt-auto group-hover:border-primary group-hover:text-primary",
        })}
      >
        <Download className="size-4" aria-hidden /> Descargar
      </span>
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </a>
  );
}
