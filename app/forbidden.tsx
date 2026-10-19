import { ButtonLink } from "@/components/ui/Button";

export default function Forbidden() {
  return (
    <section className="flex flex-col items-start gap-4 py-16">
      <p className="font-mono text-sm text-danger">{"// error 403"}</p>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        <span className="font-mono text-primary">&gt;_</span> Acceso restringido
      </h1>
      <p className="max-w-md text-text-muted">Esta sección es solo para la directiva de C_ALIGO.</p>
      <ButtonLink href="/" variant="secondary">
        Volver al inicio
      </ButtonLink>
    </section>
  );
}
