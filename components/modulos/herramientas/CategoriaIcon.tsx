import { createElement } from "react";
import {
  Box,
  Brain,
  Code,
  Database,
  GitBranch,
  Globe,
  Network,
  Package,
  PenTool,
  Shield,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";

// `categoria` es texto libre: se busca por palabra clave, de lo más específico a lo más general.
const ICONS: [keyword: string, icon: LucideIcon][] = [
  ["version", GitBranch],
  ["git", GitBranch],
  ["web", Globe],
  ["diseno", PenTool],
  ["3d", Box],
  ["ide", SquareTerminal],
  ["terminal", SquareTerminal],
  ["editor", Code],
  ["base de datos", Database],
  ["seguridad", Shield],
  ["red", Network],
  ["ia", Brain],
];

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function iconFor(categoria: string | null): LucideIcon {
  if (!categoria) return Package;
  const words = normalize(categoria);
  // Coincidencia por palabra completa para que "ia" no case con "media" ni "red" con "credenciales".
  const found = ICONS.find(([kw]) => new RegExp(`\b${kw}`).test(words));
  return found?.[1] ?? Package;
}

/** Ícono de lucide según la categoría de la herramienta. */
export function CategoriaIcon({ categoria, className }: { categoria: string | null; className?: string }) {
  return createElement(iconFor(categoria), { className, "aria-hidden": true });
}
