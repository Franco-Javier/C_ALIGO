import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { UserArea } from "./UserArea";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <NavLinks />
        <div className="ml-auto flex items-center gap-2">
          {/* La sesión se lee en tiempo de request: se aísla en Suspense. */}
          <Suspense fallback={<Skeleton className="size-9 rounded-full" />}>
            <UserArea />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
