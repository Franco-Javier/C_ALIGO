import { ButtonLink } from "@/components/ui/Button";

// Placeholder de la Fase 0. El inicio real (§7.1) se construye en la Fase 1.
export default function Home() {
  return (
    <section className="flex flex-col items-start gap-6 py-12">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">
        <span className="font-mono text-primary">&gt;_ </span>C_ALIGO
      </h1>
      <p className="max-w-xl text-text-muted">Comunidad de programación · FISC UTP Coclé</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/login">Únete a la comunidad</ButtonLink>
        <ButtonLink href="/dev/ui" variant="secondary">
          Ver componentes (dev)
        </ButtonLink>
      </div>
    </section>
  );
}
