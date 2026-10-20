// Atajos sobre los tipos generados de Supabase (types/supabase.ts).
import type { Database } from "./supabase";

export type { Database, Json } from "./supabase";

// ---------- Atajos ----------
type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];
export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];

export type RolUsuario = Enums<"rol_usuario">;
export type EstadoUsuario = Enums<"estado_usuario">;
export type AreaCarrera = Enums<"area_carrera">;
export type EstadoProyecto = Enums<"estado_proyecto">;
export type TipoEvento = Enums<"tipo_evento">;
export type TipoMaterial = Enums<"tipo_material">;

export type Perfil = Tables<"perfiles">;
export type Badge = Tables<"badges">;
export type PerfilBadge = Tables<"perfil_badges">;
export type Proyecto = Tables<"proyectos">;
export type ProyectoMiembro = Tables<"proyecto_miembros">;
export type Foro = Tables<"foros">;
export type Hilo = Tables<"hilos">;
export type Mensaje = Tables<"mensajes">;
export type Evento = Tables<"eventos">;
export type EventoAsistente = Tables<"evento_asistentes">;
export type Evidencia = Tables<"evidencias">;
export type Material = Tables<"materiales">;
export type Herramienta = Tables<"herramientas">;
export type Noticia = Tables<"noticias">;

// ---------- Tipos compuestos (consultas con joins) ----------
export type PerfilResumen = Pick<
  Perfil,
  "id" | "nombre" | "usuario_github" | "avatar_url" | "rol"
>;

export type EventoConAsistentes = Evento & { asistentes_count: number };

export type ProyectoConEquipo = Proyecto & {
  responsable: PerfilResumen | null;
  miembros: (ProyectoMiembro & { perfil: PerfilResumen })[];
};

export type HiloConAutor = Hilo & { autor: PerfilResumen | null };
export type MensajeConAutor = Mensaje & { autor: PerfilResumen | null };
export type MaterialConAutor = Material & { autor: PerfilResumen | null };
export type BadgeOtorgado = Badge & { otorgado_en: string | null };
