"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera } from "lucide-react";
import type { Evidencia } from "@/types/database";
import { cardStyles } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import { GalleryModal } from "./GalleryModal";

/** Grid de evidencias (3 col / 1 col móvil). Cada tarjeta abre la galería. */
export function EvidenciasGallery({ evidencias }: { evidencias: Evidencia[] }) {
  const [selected, setSelected] = useState<Evidencia | null>(null);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {evidencias.map((evidencia) => {
          const fotos = evidencia.fotos ?? [];
          return (
            <li key={evidencia.id}>
              <button
                type="button"
                onClick={() => setSelected(evidencia)}
                className={cardStyles({
                  interactive: true,
                  className: "group flex w-full flex-col overflow-hidden text-left",
                })}
              >
                <div className="relative aspect-video w-full bg-surface-2">
                  {fotos[0] && (
                    <Image
                      src={fotos[0]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                  {fotos.length > 1 && (
                    <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-text">
                      <Camera className="size-3" aria-hidden /> {fotos.length}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="font-display font-semibold leading-snug">{evidencia.titulo}</h3>
                  {evidencia.fecha && (
                    <p className="font-mono text-xs text-text-muted">{formatDate(evidencia.fecha)}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <GalleryModal evidencia={selected} onClose={() => setSelected(null)} />
    </>
  );
}
