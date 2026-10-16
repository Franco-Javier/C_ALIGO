import {
  Calendar,
  Camera,
  FolderGit2,
  Home,
  Library,
  MessagesSquare,
  Newspaper,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

const ITEMS = {
  inicio: { href: "/", label: "Inicio", icon: Home },
  eventos: { href: "/eventos", label: "Eventos", icon: Calendar },
  proyectos: { href: "/proyectos", label: "Proyectos", icon: FolderGit2 },
  foros: { href: "/foros", label: "Foros", icon: MessagesSquare },
  materiales: { href: "/materiales", label: "Materiales", icon: Library },
  herramientas: { href: "/herramientas", label: "Herramientas", icon: Wrench },
  noticias: { href: "/noticias", label: "Noticias", icon: Newspaper },
  miembros: { href: "/miembros", label: "Miembros", icon: Users },
} satisfies Record<string, NavItem>;

/** Solo en el menú "Más" móvil; en escritorio se llega desde el Inicio. */
const IMPACTO_ITEM: NavItem = { href: "/impacto", label: "Impacto", icon: Camera };

export const ADMIN_ITEM: NavItem = { href: "/admin", label: "Admin", icon: ShieldCheck };

/** Navbar de escritorio. */
export const DESKTOP_NAV: NavItem[] = Object.values(ITEMS);

/** Barra inferior móvil (el quinto botón es "Más"). */
export const MOBILE_PRIMARY: NavItem[] = [ITEMS.inicio, ITEMS.eventos, ITEMS.proyectos, ITEMS.foros];

/** Menú "Más" en móvil; Admin se agrega solo para la directiva. */
export const MOBILE_MORE: NavItem[] = [
  ITEMS.materiales,
  ITEMS.herramientas,
  ITEMS.noticias,
  ITEMS.miembros,
  IMPACTO_ITEM,
];

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
