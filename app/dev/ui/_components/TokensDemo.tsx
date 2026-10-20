import { Card } from "@/components/ui/Card";
import { DemoSection } from "./DemoSection";

const COLORS = [
  { token: "--bg", className: "bg-bg" },
  { token: "--surface", className: "bg-surface" },
  { token: "--surface-2", className: "bg-surface-2" },
  { token: "--border", className: "bg-border" },
  { token: "--text", className: "bg-text" },
  { token: "--text-muted", className: "bg-text-muted" },
  { token: "--primary", className: "bg-primary shadow-glow" },
  { token: "--danger", className: "bg-danger" },
  { token: "--warning", className: "bg-warning" },
];

export function TokensDemo() {
  return (
    <>
      <DemoSection title="Colores">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {COLORS.map(({ token, className }) => (
            <div key={token} className="flex flex-col gap-2">
              <div className={`h-14 rounded-lg border border-border ${className}`} />
              <span className="font-mono text-[11px] text-text-muted">{token}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Tipografía">
        <Card className="flex flex-col gap-4 p-5">
          <div>
            <p className="mb-1 font-mono text-xs text-text-muted">Space Grotesk · títulos</p>
            <p className="font-display text-3xl font-bold">Comunidad de programación</p>
          </div>
          <div>
            <p className="mb-1 font-mono text-xs text-text-muted">Inter · texto</p>
            <p>
              Mostramos el impacto de la comunidad: hackathons, charlas, giras y stands en la FISC
              de la UTP Coclé.
            </p>
          </div>
          <div>
            <p className="mb-1 font-mono text-xs text-text-muted">JetBrains Mono · código</p>
            <p className="font-mono text-primary">for (i = 0; i &lt; 3; i++) print(i*2) · @Franco-Javier</p>
          </div>
        </Card>
      </DemoSection>
    </>
  );
}
