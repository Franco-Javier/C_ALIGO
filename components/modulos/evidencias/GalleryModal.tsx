"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Evidencia } from "@/types/database";
import { Modal } from "@/components/ui/Modal";
import { cn, formatDate } from "@/lib/utils";

type GalleryModalProps = { evidencia: Evidencia | null; onClose: () => void };

const ARROW =
  "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-text transition hover:text-primary";

/** Galería con todas las fotos[] de una evidencia y su descripción. */
export function GalleryModal({ evidencia, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(0);

  // Volver a la primera foto al cambiar de evidencia.
  const [lastId, setLastId] = useState(evidencia?.id);
  if (evidencia?.id !== lastId) {
    setLastId(evidencia?.id);
    setIndex(0);
  }

  const fotos = evidencia?.fotos ?? [];
  const total = fotos.length;
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <Modal open={evidencia !== null} onClose={onClose} title={evidencia?.titulo ?? ""} size="xl">
      {evidencia && (
        <div
          className="flex flex-col gap-4"
          onKeyDown={(e) => {
            if (total < 2) return;
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          {total > 0 && (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-2">
              <Image
                key={fotos[index]}
                src={fotos[index]!}
                alt={`${evidencia.titulo}, foto ${index + 1} de ${total}`}
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-contain"
              />
              {total > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={cn(ARROW, "left-2")}>
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className={cn(ARROW, "right-2")}>
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-black/70 px-2 py-0.5 font-mono text-xs">
                    {index + 1} / {total}
                  </span>
                </>
              )}
            </div>
          )}

          {total > 1 && (
            <ul className="flex gap-2 overflow-x-auto pb-1">
              {fotos.map((foto, i) => (
                <li key={`${foto}-${i}`} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "relative block h-14 w-24 overflow-hidden rounded-md border-2 transition",
                      i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image src={foto} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {evidencia.fecha && (
            <p className="font-mono text-xs text-text-muted">{formatDate(evidencia.fecha)}</p>
          )}
          {evidencia.descripcion && <p className="text-sm leading-relaxed">{evidencia.descripcion}</p>}
        </div>
      )}
    </Modal>
  );
}
