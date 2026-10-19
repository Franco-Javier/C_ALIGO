import { Avatar } from "@/components/ui/Avatar";
import { signInAsMock } from "@/lib/actions/auth";
import { ESTADO_USUARIO_LABEL, ROL_LABEL } from "@/lib/labels";
import { MOCK_PERFILES } from "@/lib/mock";

/** Solo en modo mock: entrar como cualquier perfil de ejemplo para revisar permisos. */
export function MockLoginPanel() {
  return (
    <div className="w-full rounded-xl border border-dashed border-warning/50 p-4">
      <p className="mb-3 font-mono text-xs text-warning">{"// modo mock · entrar como:"}</p>
      <ul className="flex flex-col gap-1">
        {MOCK_PERFILES.map((perfil) => (
          <li key={perfil.id}>
            <form action={signInAsMock.bind(null, perfil.id)}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg p-1.5 text-left transition hover:bg-surface-2"
              >
                <Avatar name={perfil.nombre} src={perfil.avatar_url} size="xs" />
                <span className="min-w-0 flex-1 truncate text-sm">{perfil.nombre}</span>
                <span className="font-mono text-[11px] text-text-muted">
                  {ROL_LABEL[perfil.rol]} · {ESTADO_USUARIO_LABEL[perfil.estado]}
                </span>
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
