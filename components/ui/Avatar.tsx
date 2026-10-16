import Image from "next/image";
import { cn, initials } from "@/lib/utils";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const PX: Record<Size, number> = { xs: 24, sm: 32, md: 40, lg: 64, xl: 112 };
const TEXT: Record<Size, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-xl",
  xl: "text-3xl",
};

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: Size;
  className?: string;
};

/** Foto de perfil (GitHub) o iniciales si no hay imagen. */
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const px = PX[size];
  const base = cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
    "border border-border bg-surface-2",
    className,
  );

  if (src) {
    return (
      <span className={base} style={{ width: px, height: px }}>
        <Image src={src} alt={name} width={px} height={px} className="size-full object-cover" />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={cn(base, "font-mono font-semibold text-primary", TEXT[size])}
      style={{ width: px, height: px }}
    >
      {initials(name)}
    </span>
  );
}

type AvatarGroupProps = {
  people: { id: string; nombre: string; avatar_url: string | null }[];
  max?: number;
  size?: Size;
};

/** (av)(av)(av) +2 */
export function AvatarGroup({ people, max = 3, size = "sm" }: AvatarGroupProps) {
  const visible = people.slice(0, max);
  const rest = people.length - visible.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {visible.map((p) => (
          <Avatar key={p.id} name={p.nombre} src={p.avatar_url} size={size} className="ring-2 ring-surface" />
        ))}
      </div>
      {rest > 0 && <span className="ml-2 font-mono text-xs text-text-muted">+{rest}</span>}
    </div>
  );
}
