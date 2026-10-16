import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-black hover:shadow-glow",
  secondary:
    "border border-border bg-surface text-text hover:border-primary hover:text-primary",
  ghost: "text-text-muted hover:bg-surface-2 hover:text-text",
  danger: "bg-danger text-black hover:shadow-[0_0_18px_rgba(255,92,92,0.35)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-lg font-display font-medium transition",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps & { loading?: boolean };

export function Button({
  variant,
  size,
  className,
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleProps;

/** Enlace con apariencia de botón. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
