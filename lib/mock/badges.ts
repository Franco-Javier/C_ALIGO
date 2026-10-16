import type { Badge, PerfilBadge } from "@/types/database";
import { P, mockId } from "./ids";

export const MOCK_BADGES: Badge[] = [
  { id: mockId.badge(1), nombre: "Fundador", descripcion: "Miembro fundador de C_ALIGO", icono_url: null, proyecto_id: null, creado_en: "2026-08-01T12:00:00Z" },
  { id: mockId.badge(2), nombre: "Primer commit", descripcion: "Contribuyó a la plataforma C_ALIGO", icono_url: null, proyecto_id: mockId.proyecto(1), creado_en: "2026-08-15T12:00:00Z" },
  { id: mockId.badge(3), nombre: "Hacker de stand", descripcion: "Atendió el stand de la Feria de Ingeniería", icono_url: null, proyecto_id: null, creado_en: "2026-08-28T12:00:00Z" },
];

export const MOCK_PERFIL_BADGES: PerfilBadge[] = [
  { perfil_id: P.francisco, badge_id: mockId.badge(1), otorgado_en: "2026-08-01T12:00:00Z" },
  { perfil_id: P.maria, badge_id: mockId.badge(1), otorgado_en: "2026-08-01T12:00:00Z" },
  { perfil_id: P.isacar, badge_id: mockId.badge(1), otorgado_en: "2026-08-01T12:00:00Z" },
  { perfil_id: P.francisco, badge_id: mockId.badge(2), otorgado_en: "2026-08-15T12:00:00Z" },
  { perfil_id: P.ana, badge_id: mockId.badge(2), otorgado_en: "2026-08-15T12:00:00Z" },
  { perfil_id: P.ana, badge_id: mockId.badge(3), otorgado_en: "2026-08-28T12:00:00Z" },
];
