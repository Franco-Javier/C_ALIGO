// Tipos que reflejan supabase/schema.sql.
// Formato compatible con `supabase gen types typescript`, para poder
// regenerarlos más adelante sin cambiar el resto del código.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      perfiles: {
        Row: {
          id: string;
          nombre: string;
          usuario_github: string | null;
          avatar_url: string | null;
          carrera: string | null;
          area: Database["public"]["Enums"]["area_carrera"] | null;
          bio: string | null;
          rol: Database["public"]["Enums"]["rol_usuario"];
          estado: Database["public"]["Enums"]["estado_usuario"];
          puzzle_resuelto_en: string | null;
          ultima_actividad: string | null;
          creado_en: string | null;
        };
        Insert: {
          id: string;
          nombre: string;
          usuario_github?: string | null;
          avatar_url?: string | null;
          carrera?: string | null;
          area?: Database["public"]["Enums"]["area_carrera"] | null;
          bio?: string | null;
          rol?: Database["public"]["Enums"]["rol_usuario"];
          estado?: Database["public"]["Enums"]["estado_usuario"];
          puzzle_resuelto_en?: string | null;
          ultima_actividad?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          nombre?: string;
          usuario_github?: string | null;
          avatar_url?: string | null;
          carrera?: string | null;
          area?: Database["public"]["Enums"]["area_carrera"] | null;
          bio?: string | null;
          rol?: Database["public"]["Enums"]["rol_usuario"];
          estado?: Database["public"]["Enums"]["estado_usuario"];
          puzzle_resuelto_en?: string | null;
          ultima_actividad?: string | null;
          creado_en?: string | null;
        };
        Relationships: [];
      };
      badges: {
        Row: {
          id: string;
          nombre: string;
          descripcion: string | null;
          icono_url: string | null;
          proyecto_id: string | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          nombre: string;
          descripcion?: string | null;
          icono_url?: string | null;
          proyecto_id?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          nombre?: string;
          descripcion?: string | null;
          icono_url?: string | null;
          proyecto_id?: string | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "badges_proyecto_fk";
            columns: ["proyecto_id"];
            isOneToOne: false;
            referencedRelation: "proyectos";
            referencedColumns: ["id"];
          },
        ];
      };
      perfil_badges: {
        Row: {
          perfil_id: string;
          badge_id: string;
          otorgado_en: string | null;
        };
        Insert: {
          perfil_id: string;
          badge_id: string;
          otorgado_en?: string | null;
        };
        Update: {
          perfil_id?: string;
          badge_id?: string;
          otorgado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "perfil_badges_perfil_id_fkey";
            columns: ["perfil_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "perfil_badges_badge_id_fkey";
            columns: ["badge_id"];
            isOneToOne: false;
            referencedRelation: "badges";
            referencedColumns: ["id"];
          },
        ];
      };
      proyectos: {
        Row: {
          id: string;
          nombre: string;
          descripcion: string | null;
          estado: Database["public"]["Enums"]["estado_proyecto"];
          repo_github: string | null;
          imagen_url: string | null;
          responsable_id: string | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          nombre: string;
          descripcion?: string | null;
          estado?: Database["public"]["Enums"]["estado_proyecto"];
          repo_github?: string | null;
          imagen_url?: string | null;
          responsable_id?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          nombre?: string;
          descripcion?: string | null;
          estado?: Database["public"]["Enums"]["estado_proyecto"];
          repo_github?: string | null;
          imagen_url?: string | null;
          responsable_id?: string | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "proyectos_responsable_id_fkey";
            columns: ["responsable_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      proyecto_miembros: {
        Row: {
          proyecto_id: string;
          perfil_id: string;
          funcion: string | null;
          unido_en: string | null;
        };
        Insert: {
          proyecto_id: string;
          perfil_id: string;
          funcion?: string | null;
          unido_en?: string | null;
        };
        Update: {
          proyecto_id?: string;
          perfil_id?: string;
          funcion?: string | null;
          unido_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "proyecto_miembros_proyecto_id_fkey";
            columns: ["proyecto_id"];
            isOneToOne: false;
            referencedRelation: "proyectos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proyecto_miembros_perfil_id_fkey";
            columns: ["perfil_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      foros: {
        Row: {
          id: string;
          nombre: string;
          descripcion: string | null;
          foro_padre_id: string | null;
          orden: number | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          nombre: string;
          descripcion?: string | null;
          foro_padre_id?: string | null;
          orden?: number | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          nombre?: string;
          descripcion?: string | null;
          foro_padre_id?: string | null;
          orden?: number | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "foros_foro_padre_id_fkey";
            columns: ["foro_padre_id"];
            isOneToOne: false;
            referencedRelation: "foros";
            referencedColumns: ["id"];
          },
        ];
      };
      hilos: {
        Row: {
          id: string;
          foro_id: string | null;
          titulo: string;
          autor_id: string | null;
          fijado: boolean | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          foro_id?: string | null;
          titulo: string;
          autor_id?: string | null;
          fijado?: boolean | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          foro_id?: string | null;
          titulo?: string;
          autor_id?: string | null;
          fijado?: boolean | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "hilos_foro_id_fkey";
            columns: ["foro_id"];
            isOneToOne: false;
            referencedRelation: "foros";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hilos_autor_id_fkey";
            columns: ["autor_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      mensajes: {
        Row: {
          id: string;
          hilo_id: string | null;
          autor_id: string | null;
          contenido: string;
          creado_en: string | null;
          editado_en: string | null;
        };
        Insert: {
          id?: string;
          hilo_id?: string | null;
          autor_id?: string | null;
          contenido: string;
          creado_en?: string | null;
          editado_en?: string | null;
        };
        Update: {
          id?: string;
          hilo_id?: string | null;
          autor_id?: string | null;
          contenido?: string;
          creado_en?: string | null;
          editado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "mensajes_hilo_id_fkey";
            columns: ["hilo_id"];
            isOneToOne: false;
            referencedRelation: "hilos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mensajes_autor_id_fkey";
            columns: ["autor_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      eventos: {
        Row: {
          id: string;
          titulo: string;
          descripcion: string | null;
          tipo: Database["public"]["Enums"]["tipo_evento"];
          fecha_inicio: string;
          fecha_fin: string | null;
          lugar: string | null;
          validado_utp: boolean | null;
          creado_por: string | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          titulo: string;
          descripcion?: string | null;
          tipo: Database["public"]["Enums"]["tipo_evento"];
          fecha_inicio: string;
          fecha_fin?: string | null;
          lugar?: string | null;
          validado_utp?: boolean | null;
          creado_por?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          titulo?: string;
          descripcion?: string | null;
          tipo?: Database["public"]["Enums"]["tipo_evento"];
          fecha_inicio?: string;
          fecha_fin?: string | null;
          lugar?: string | null;
          validado_utp?: boolean | null;
          creado_por?: string | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "eventos_creado_por_fkey";
            columns: ["creado_por"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      evento_asistentes: {
        Row: {
          evento_id: string;
          perfil_id: string;
        };
        Insert: {
          evento_id: string;
          perfil_id: string;
        };
        Update: {
          evento_id?: string;
          perfil_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evento_asistentes_evento_id_fkey";
            columns: ["evento_id"];
            isOneToOne: false;
            referencedRelation: "eventos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evento_asistentes_perfil_id_fkey";
            columns: ["perfil_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      evidencias: {
        Row: {
          id: string;
          titulo: string;
          descripcion: string | null;
          fotos: string[] | null;
          evento_id: string | null;
          proyecto_id: string | null;
          publicado_por: string | null;
          fecha: string | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          titulo: string;
          descripcion?: string | null;
          fotos?: string[] | null;
          evento_id?: string | null;
          proyecto_id?: string | null;
          publicado_por?: string | null;
          fecha?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          titulo?: string;
          descripcion?: string | null;
          fotos?: string[] | null;
          evento_id?: string | null;
          proyecto_id?: string | null;
          publicado_por?: string | null;
          fecha?: string | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "evidencias_evento_id_fkey";
            columns: ["evento_id"];
            isOneToOne: false;
            referencedRelation: "eventos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evidencias_proyecto_id_fkey";
            columns: ["proyecto_id"];
            isOneToOne: false;
            referencedRelation: "proyectos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evidencias_publicado_por_fkey";
            columns: ["publicado_por"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      materiales: {
        Row: {
          id: string;
          titulo: string;
          descripcion: string | null;
          tipo: Database["public"]["Enums"]["tipo_material"];
          url: string;
          tema: string | null;
          subido_por: string | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          titulo: string;
          descripcion?: string | null;
          tipo: Database["public"]["Enums"]["tipo_material"];
          url: string;
          tema?: string | null;
          subido_por?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          titulo?: string;
          descripcion?: string | null;
          tipo?: Database["public"]["Enums"]["tipo_material"];
          url?: string;
          tema?: string | null;
          subido_por?: string | null;
          creado_en?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "materiales_subido_por_fkey";
            columns: ["subido_por"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      herramientas: {
        Row: {
          id: string;
          nombre: string;
          descripcion: string | null;
          categoria: string | null;
          url_descarga: string;
          icono_url: string | null;
          orden: number | null;
        };
        Insert: {
          id?: string;
          nombre: string;
          descripcion?: string | null;
          categoria?: string | null;
          url_descarga: string;
          icono_url?: string | null;
          orden?: number | null;
        };
        Update: {
          id?: string;
          nombre?: string;
          descripcion?: string | null;
          categoria?: string | null;
          url_descarga?: string;
          icono_url?: string | null;
          orden?: number | null;
        };
        Relationships: [];
      };
      noticias: {
        Row: {
          id: string;
          titulo: string;
          resumen: string | null;
          url: string;
          fuente: string | null;
          publicado_en: string | null;
          creado_en: string | null;
        };
        Insert: {
          id?: string;
          titulo: string;
          resumen?: string | null;
          url: string;
          fuente?: string | null;
          publicado_en?: string | null;
          creado_en?: string | null;
        };
        Update: {
          id?: string;
          titulo?: string;
          resumen?: string | null;
          url?: string;
          fuente?: string | null;
          publicado_en?: string | null;
          creado_en?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      es_directiva: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      es_miembro_activo: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      rol_usuario: "presidente" | "vicepresidente" | "coordinador" | "miembro";
      estado_usuario: "pendiente" | "activo" | "inactivo";
      area_carrera: "programacion" | "ciberseguridad" | "redes";
      estado_proyecto: "idea" | "en_progreso" | "pausado" | "terminado";
      tipo_evento: "workshop" | "charla" | "hackathon" | "gira" | "stand" | "reunion";
      tipo_material: "link" | "documento" | "video" | "curso";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

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
