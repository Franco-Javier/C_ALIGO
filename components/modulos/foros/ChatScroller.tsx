"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Contenedor con scroll que baja al último mensaje al abrir el hilo y cuando llega uno nuevo. */
export function ChatScroller({ count, children }: { count: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count]);

  return (
    <div ref={ref} className="max-h-[60dvh] min-h-48 overflow-y-auto p-2" aria-live="polite">
      {children}
    </div>
  );
}
