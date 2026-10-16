import { ButtonLink } from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/data/session";
import { isDirectiva } from "@/lib/labels";
import { AvatarMenu } from "./AvatarMenu";

/** Lado derecho del navbar: [avatar ▾] o [Entrar]. */
export async function UserArea() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ButtonLink href="/login" size="sm">
        Entrar
      </ButtonLink>
    );
  }

  // La campana de notificaciones (§6) queda oculta hasta la Fase 4.
  return (
    <AvatarMenu
      nombre={user.nombre}
      usuarioGithub={user.usuario_github}
      avatarUrl={user.avatar_url}
      esDirectiva={isDirectiva(user.rol)}
    />
  );
}
