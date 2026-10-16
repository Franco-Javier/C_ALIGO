import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { AREA_LABEL } from "@/lib/labels";
import { DemoSection } from "./DemoSection";

const AREAS = Object.entries(AREA_LABEL).map(([value, label]) => ({ value, label }));

export function FormsDemo() {
  return (
    <DemoSection title="Input">
      <Card className="grid gap-5 p-5 sm:grid-cols-2">
        <Input label="Nombre" placeholder="Francisco Herazo" />
        <Input label="Usuario de GitHub" placeholder="@usuario" hint="Se toma de tu cuenta." />
        <Input label="Respuesta" defaultValue="0 2 4 5" error="✖ Incorrecto, intenta de nuevo" className="font-mono" />
        <Input label="Deshabilitado" defaultValue="presidente" disabled />
        <Select label="Área" options={AREAS} placeholder="Elige un área" defaultValue="" />
        <Input label="Buscar" hideLabel placeholder="Buscar... (label oculto)" type="search" />
        <div className="sm:col-span-2">
          <Textarea label="Bio" placeholder="Cuéntanos sobre ti..." />
        </div>
      </Card>
    </DemoSection>
  );
}
