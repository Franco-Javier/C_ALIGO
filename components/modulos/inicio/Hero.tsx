import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-border px-5 py-14 sm:px-10 sm:py-20">
      {/* Cuadrícula decorativa con brillo verde */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_75%)] opacity-60"
      />
      <div
        aria-hidden
        className="absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-primary/20 blur-3xl"
      />

      <p className="mb-4 font-mono text-xs text-text-muted sm:text-sm">
        <span className="text-primary">{"//"}</span> programación · ciberseguridad · redes · IA
      </p>
      <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
        <span className="font-mono text-primary">&gt;_</span> C_ALIGO
        <span aria-hidden className="cursor-blink ml-1 inline-block h-[0.8em] w-[0.45em] translate-y-[0.05em] bg-primary" />
      </h1>
      <p className="mt-4 max-w-xl text-base text-text-muted sm:text-lg">
        Comunidad de programación · FISC UTP Coclé
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/login" size="lg">
          Únete a la comunidad
        </ButtonLink>
        <ButtonLink href="/proyectos" variant="secondary" size="lg">
          Ver proyectos
        </ButtonLink>
      </div>
    </section>
  );
}
