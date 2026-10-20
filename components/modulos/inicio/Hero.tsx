import { Plus } from "lucide-react";
import { BrandDivider } from "@/components/ui/BrandDivider";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark, Wordmark } from "@/components/ui/LogoMark";

const PILARES = ["aprende", "conecta", "construye"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-border bg-bg px-5 py-8 sm:px-10 sm:py-10">
      {/* Cuadrícula decorativa con brillo verde */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_right,black_15%,transparent_70%)] opacity-50"
      />
      <div aria-hidden className="absolute -right-20 -top-24 -z-10 size-96 rounded-full bg-primary/15 blur-3xl" />

      {/* Cabecera estilo ficha de marca */}
      <div className="flex justify-between gap-6 text-[10px] leading-relaxed text-primary sm:text-xs">
        <p className="brand-label border-l border-primary pl-3">
          C_ALIGO
          <br />
          Programación / Ciberseguridad / Redes / IA
          <br />
          FISC · UTP Coclé
        </p>
        <ul className="brand-label hidden border-r border-primary pr-3 text-right sm:block">
          {PILARES.map((p) => (
            <li key={p}>{"// " + p}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-8 py-12 sm:py-16">
        <div className="min-w-0">
          <h1 className="text-[clamp(2.75rem,11vw,5.5rem)]">
            <Wordmark blink />
          </h1>
          <p className="brand-label mt-3 text-sm tracking-[0.5em] text-primary sm:text-lg">caligo.lab</p>
          <p className="mt-6 max-w-xl text-base text-text-muted sm:text-lg">
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
        </div>
        <LogoMark className="hidden size-56 shrink-0 drop-shadow-[0_0_28px_var(--primary-glow)] lg:block" />
      </div>

      <BrandDivider className="mb-6 max-w-sm" />

      {/* Pie de la ficha: lema y coordenadas de Coclé */}
      <div className="flex items-end justify-between gap-6 text-[10px] leading-relaxed sm:text-xs">
        <p className="brand-label border-l border-primary pl-3 text-text">
          Construye. Comunica.
          <br />
          Edifica. Lidera.
        </p>
        <div className="brand-label flex items-center gap-3 text-right text-text-muted">
          <p>
            08.5180° N
            <br />
            80.3570° W
          </p>
          <Plus aria-hidden className="size-5 text-primary" strokeWidth={1.25} />
        </div>
      </div>
    </section>
  );
}
