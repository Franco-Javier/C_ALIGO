import { Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Badge, EstadoProyectoBadge, RolBadge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";
import { Tag } from "@/components/ui/Tag";
import { MOCK_PERFILES } from "@/lib/mock";
import { DemoRow, DemoSection } from "./DemoSection";

const GITHUB_AVATAR = "https://avatars.githubusercontent.com/u/9919?v=4";

export function PrimitivesDemo() {
  return (
    <>
      <DemoSection title="Button">
        <Card className="px-5">
          <DemoRow label="variantes">
            <Button>Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">
              <Trash2 className="size-4" aria-hidden /> Eliminar
            </Button>
          </DemoRow>
          <DemoRow label="tamaños">
            <Button size="sm">Pequeño</Button>
            <Button size="md">Mediano</Button>
            <Button size="lg">Grande</Button>
          </DemoRow>
          <DemoRow label="estados">
            <Button loading>Guardando</Button>
            <Button disabled>Deshabilitado</Button>
            <ButtonLink href="/dev/ui" variant="secondary">
              <Plus className="size-4" aria-hidden /> ButtonLink
            </ButtonLink>
          </DemoRow>
        </Card>
      </DemoSection>

      <DemoSection title="Badge y Tag">
        <Card className="px-5">
          <DemoRow label="estado proyecto">
            <EstadoProyectoBadge estado="idea" />
            <EstadoProyectoBadge estado="en_progreso" />
            <EstadoProyectoBadge estado="pausado" />
            <EstadoProyectoBadge estado="terminado" />
          </DemoRow>
          <DemoRow label="roles">
            <RolBadge rol="presidente" />
            <RolBadge rol="coordinador" />
            <RolBadge rol="miembro" />
          </DemoRow>
          <DemoRow label="tonos">
            <Badge>neutral</Badge>
            <Badge tone="primary">✔ Validado UTP</Badge>
            <Badge tone="warning">pendiente</Badge>
            <Badge tone="danger">error</Badge>
            <Badge tone="outline">outline</Badge>
          </DemoRow>
          <DemoRow label="tags">
            <Tag>Python</Tag>
            <Tag>Pentesting</Tag>
            <Tag prefix="//">sin hash</Tag>
          </DemoRow>
        </Card>
      </DemoSection>

      <DemoSection title="Avatar">
        <Card className="px-5">
          <DemoRow label="tamaños">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <Avatar key={size} name="Francisco Herazo" size={size} />
            ))}
          </DemoRow>
          <DemoRow label="con imagen">
            <Avatar name="GitHub" src={GITHUB_AVATAR} size="md" />
            <Avatar name="GitHub" src={GITHUB_AVATAR} size="lg" />
          </DemoRow>
          <DemoRow label="grupo">
            <AvatarGroup people={MOCK_PERFILES.slice(0, 5)} />
          </DemoRow>
        </Card>
      </DemoSection>

      <DemoSection title="Card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-5">
            <p className="font-display font-semibold">Card</p>
            <p className="text-sm text-text-muted">Superficie con borde.</p>
          </Card>
          <Card interactive className="p-5">
            <p className="font-display font-semibold">Card interactive</p>
            <p className="text-sm text-text-muted">Pasa el cursor: el borde se vuelve verde.</p>
          </Card>
        </div>
      </DemoSection>

      <DemoSection title="Skeleton">
        <div className="grid gap-4 sm:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard withImage={false} />
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="EmptyState">
        <div className="grid gap-4 sm:grid-cols-2">
          <EmptyState message="Aún no hay eventos" />
          <EmptyState
            message="Aún no hay materiales"
            description="Comparte guías, cursos o videos con la comunidad."
            action={
              <Button size="sm">
                <Plus className="size-4" aria-hidden /> Subir material
              </Button>
            }
          />
        </div>
      </DemoSection>
    </>
  );
}
