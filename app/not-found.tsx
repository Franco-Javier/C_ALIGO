import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-4 py-16">
      <p className="font-mono text-sm text-primary">{"// error 404"}</p>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        <span className="font-mono text-primary">&gt;_</span> Página no encontrada
      </h1>
      <p className="max-w-md text-text-muted">
        Lo que buscas no existe o fue movido.
      </p>
      <ButtonLink href="/" variant="secondary">
        Volver al inicio
      </ButtonLink>
    </section>
  );
}
