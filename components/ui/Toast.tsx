"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import type { ActionResult } from "@/lib/actions/types";
import { cn } from "@/lib/utils";

type Tone = "success" | "error" | "info";
type ToastItem = { id: number; tone: Tone; message: string };

type ToastApi = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  /** Muestra el error de una Server Action, o `successMessage` si salió bien. */
  fromResult: (result: ActionResult, successMessage?: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

const DURATION: Record<Tone, number> = { success: 4000, info: 4000, error: 6000 };

const ICON = {
  success: <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />,
  error: <XCircle className="size-5 shrink-0 text-danger" aria-hidden />,
  info: <Info className="size-5 shrink-0 text-text-muted" aria-hidden />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (tone: Tone, message: string) => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-2), { id, tone, message }]);
      timers.current.set(id, setTimeout(() => dismiss(id), DURATION[tone]));
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const [api] = useState<ToastApi>(() => ({
    success: (m) => push("success", m),
    error: (m) => push("error", m),
    info: (m) => push("info", m),
    fromResult: (result, successMessage) => {
      if (!result.ok) push("error", result.error);
      else if (successMessage) push("success", successMessage);
    },
  }));

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* bottom-20 en móvil para quedar sobre la barra inferior */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-20 z-50 flex flex-col gap-2 sm:left-auto sm:w-96 lg:bottom-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-xl border bg-surface p-3.5 shadow-2xl",
              t.tone === "error" ? "border-danger/50" : t.tone === "success" ? "border-primary/50" : "border-border",
            )}
          >
            {ICON[t.tone]}
            <p className="flex-1 text-sm">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Cerrar aviso"
              className="rounded p-0.5 text-text-muted transition hover:text-text"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const api = useContext(ToastContext);
  if (!api) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return api;
}
