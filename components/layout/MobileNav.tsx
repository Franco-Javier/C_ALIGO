import { Suspense } from "react";
import { getCurrentUser } from "@/lib/data/session";
import { isDirectiva } from "@/lib/labels";
import { MobileNavBar } from "./MobileNavBar";

async function MobileNavWithUser() {
  const user = await getCurrentUser();
  return <MobileNavBar esDirectiva={isDirectiva(user?.rol)} />;
}

/** Barra inferior fija en móvil. Mientras carga la sesión se muestra sin "Admin". */
export function MobileNav() {
  return (
    <Suspense fallback={<MobileNavBar esDirectiva={false} />}>
      <MobileNavWithUser />
    </Suspense>
  );
}
