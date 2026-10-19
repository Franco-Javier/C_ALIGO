"use client";

import { useRef, useTransition } from "react";
import { UserMinus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { otorgarBadge, quitarBadge } from "@/lib/actions/admin/badges";
import type { BadgeConOtorgados } from "@/lib/data/badges";
import { formatDate } from "@/lib/utils";

type Option = { value: string; label: string };
type OtorgarModalProps = { badge: BadgeConOtorgados | null; miembros: Option[]; onClose: () => void };

/** Quién tiene el badge: otorgarlo a más miembros o quitarlo. */
export function OtorgarModal({ badge, miembros, onClose }: OtorgarModalProps) {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  if (!badge) return null;
  const badgeId = badge.id;
  const loTienen = new Set(badge.otorgados.map((o) => o.perfil.id));

  const onOtorgar = (form: FormData) =>
    startTransition(async () => {
      const result = await otorgarBadge(badgeId, form);
      toast.fromResult(result, "Badge otorgado");
      if (result.ok) formRef.current?.reset();
    });

  const onQuitar = (perfilId: string) =>
    startTransition(async () => toast.fromResult(await quitarBadge(badgeId, perfilId), "Badge retirado"));

  return (
    <Modal open onClose={onClose} title={`Otorgar · ${badge.nombre}`}>
      <div className="flex flex-col gap-5">
        {badge.otorgados.length === 0 ? (
          <p className="font-mono text-sm text-text-muted">{"// Nadie lo tiene todavía"}</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {badge.otorgados.map(({ perfil, otorgado_en }) => (
              <li key={perfil.id} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-surface-2">
                <Avatar name={perfil.nombre} src={perfil.avatar_url} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{perfil.nombre}</span>
                  {otorgado_en && <span className="block font-mono text-xs text-text-muted">{formatDate(otorgado_en)}</span>}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => onQuitar(perfil.id)}
                  aria-label={`Quitar el badge a ${perfil.nombre}`}
                  className="hover:text-danger"
                >
                  <UserMinus className="size-4" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <form ref={formRef} action={onOtorgar} className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Select
              label="Otorgar a"
              name="perfil_id"
              options={miembros.filter((o) => !loTienen.has(o.value))}
              placeholder="Elige un miembro"
              required
            />
          </div>
          <Button type="submit" loading={pending}>
            Otorgar
          </Button>
        </form>
      </div>
    </Modal>
  );
}
