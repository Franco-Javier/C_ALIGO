export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          icono_url: string | null
          id: string
          nombre: string
          proyecto_id: string | null
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          icono_url?: string | null
          id?: string
          nombre: string
          proyecto_id?: string | null
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          icono_url?: string | null
          id?: string
          nombre?: string
          proyecto_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "badges_proyecto_fk"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos"
            referencedColumns: ["id"]
          },
        ]
      }
      evento_asistentes: {
        Row: {
          evento_id: string
          perfil_id: string
        }
        Insert: {
          evento_id: string
          perfil_id: string
        }
        Update: {
          evento_id?: string
          perfil_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evento_asistentes_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evento_asistentes_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos: {
        Row: {
          creado_en: string | null
          creado_por: string | null
          descripcion: string | null
          fecha_fin: string | null
          fecha_inicio: string
          id: string
          lugar: string | null
          tipo: Database["public"]["Enums"]["tipo_evento"]
          titulo: string
          validado_utp: boolean | null
        }
        Insert: {
          creado_en?: string | null
          creado_por?: string | null
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio: string
          id?: string
          lugar?: string | null
          tipo: Database["public"]["Enums"]["tipo_evento"]
          titulo: string
          validado_utp?: boolean | null
        }
        Update: {
          creado_en?: string | null
          creado_por?: string | null
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          lugar?: string | null
          tipo?: Database["public"]["Enums"]["tipo_evento"]
          titulo?: string
          validado_utp?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "eventos_creado_por_fkey"
            columns: ["creado_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      evidencias: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          evento_id: string | null
          fecha: string | null
          fotos: string[] | null
          id: string
          proyecto_id: string | null
          publicado_por: string | null
          titulo: string
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          evento_id?: string | null
          fecha?: string | null
          fotos?: string[] | null
          id?: string
          proyecto_id?: string | null
          publicado_por?: string | null
          titulo: string
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          evento_id?: string | null
          fecha?: string | null
          fotos?: string[] | null
          id?: string
          proyecto_id?: string | null
          publicado_por?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidencias_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidencias_proyecto_id_fkey"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidencias_publicado_por_fkey"
            columns: ["publicado_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      foros: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          foro_padre_id: string | null
          id: string
          nombre: string
          orden: number | null
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          foro_padre_id?: string | null
          id?: string
          nombre: string
          orden?: number | null
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          foro_padre_id?: string | null
          id?: string
          nombre?: string
          orden?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "foros_foro_padre_id_fkey"
            columns: ["foro_padre_id"]
            isOneToOne: false
            referencedRelation: "foros"
            referencedColumns: ["id"]
          },
        ]
      }
      herramientas: {
        Row: {
          categoria: string | null
          descripcion: string | null
          icono_url: string | null
          id: string
          nombre: string
          orden: number | null
          url_descarga: string
        }
        Insert: {
          categoria?: string | null
          descripcion?: string | null
          icono_url?: string | null
          id?: string
          nombre: string
          orden?: number | null
          url_descarga: string
        }
        Update: {
          categoria?: string | null
          descripcion?: string | null
          icono_url?: string | null
          id?: string
          nombre?: string
          orden?: number | null
          url_descarga?: string
        }
        Relationships: []
      }
      hilos: {
        Row: {
          autor_id: string | null
          creado_en: string | null
          fijado: boolean | null
          foro_id: string | null
          id: string
          titulo: string
        }
        Insert: {
          autor_id?: string | null
          creado_en?: string | null
          fijado?: boolean | null
          foro_id?: string | null
          id?: string
          titulo: string
        }
        Update: {
          autor_id?: string | null
          creado_en?: string | null
          fijado?: boolean | null
          foro_id?: string | null
          id?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "hilos_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hilos_foro_id_fkey"
            columns: ["foro_id"]
            isOneToOne: false
            referencedRelation: "foros"
            referencedColumns: ["id"]
          },
        ]
      }
      materiales: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          id: string
          subido_por: string | null
          tema: string | null
          tipo: Database["public"]["Enums"]["tipo_material"]
          titulo: string
          url: string
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          id?: string
          subido_por?: string | null
          tema?: string | null
          tipo: Database["public"]["Enums"]["tipo_material"]
          titulo: string
          url: string
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          id?: string
          subido_por?: string | null
          tema?: string | null
          tipo?: Database["public"]["Enums"]["tipo_material"]
          titulo?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "materiales_subido_por_fkey"
            columns: ["subido_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes: {
        Row: {
          autor_id: string | null
          contenido: string
          creado_en: string | null
          editado_en: string | null
          hilo_id: string | null
          id: string
        }
        Insert: {
          autor_id?: string | null
          contenido: string
          creado_en?: string | null
          editado_en?: string | null
          hilo_id?: string | null
          id?: string
        }
        Update: {
          autor_id?: string | null
          contenido?: string
          creado_en?: string | null
          editado_en?: string | null
          hilo_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensajes_hilo_id_fkey"
            columns: ["hilo_id"]
            isOneToOne: false
            referencedRelation: "hilos"
            referencedColumns: ["id"]
          },
        ]
      }
      noticias: {
        Row: {
          creado_en: string | null
          fuente: string | null
          id: string
          publicado_en: string | null
          resumen: string | null
          titulo: string
          url: string
        }
        Insert: {
          creado_en?: string | null
          fuente?: string | null
          id?: string
          publicado_en?: string | null
          resumen?: string | null
          titulo: string
          url: string
        }
        Update: {
          creado_en?: string | null
          fuente?: string | null
          id?: string
          publicado_en?: string | null
          resumen?: string | null
          titulo?: string
          url?: string
        }
        Relationships: []
      }
      perfil_badges: {
        Row: {
          badge_id: string
          otorgado_en: string | null
          perfil_id: string
        }
        Insert: {
          badge_id: string
          otorgado_en?: string | null
          perfil_id: string
        }
        Update: {
          badge_id?: string
          otorgado_en?: string | null
          perfil_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfil_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfil_badges_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perfiles: {
        Row: {
          area: Database["public"]["Enums"]["area_carrera"] | null
          avatar_url: string | null
          bio: string | null
          carrera: string | null
          creado_en: string | null
          estado: Database["public"]["Enums"]["estado_usuario"]
          id: string
          nombre: string
          puzzle_resuelto_en: string | null
          rol: Database["public"]["Enums"]["rol_usuario"]
          ultima_actividad: string | null
          usuario_github: string | null
        }
        Insert: {
          area?: Database["public"]["Enums"]["area_carrera"] | null
          avatar_url?: string | null
          bio?: string | null
          carrera?: string | null
          creado_en?: string | null
          estado?: Database["public"]["Enums"]["estado_usuario"]
          id: string
          nombre: string
          puzzle_resuelto_en?: string | null
          rol?: Database["public"]["Enums"]["rol_usuario"]
          ultima_actividad?: string | null
          usuario_github?: string | null
        }
        Update: {
          area?: Database["public"]["Enums"]["area_carrera"] | null
          avatar_url?: string | null
          bio?: string | null
          carrera?: string | null
          creado_en?: string | null
          estado?: Database["public"]["Enums"]["estado_usuario"]
          id?: string
          nombre?: string
          puzzle_resuelto_en?: string | null
          rol?: Database["public"]["Enums"]["rol_usuario"]
          ultima_actividad?: string | null
          usuario_github?: string | null
        }
        Relationships: []
      }
      proyecto_miembros: {
        Row: {
          funcion: string | null
          perfil_id: string
          proyecto_id: string
          unido_en: string | null
        }
        Insert: {
          funcion?: string | null
          perfil_id: string
          proyecto_id: string
          unido_en?: string | null
        }
        Update: {
          funcion?: string | null
          perfil_id?: string
          proyecto_id?: string
          unido_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proyecto_miembros_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proyecto_miembros_proyecto_id_fkey"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos"
            referencedColumns: ["id"]
          },
        ]
      }
      proyectos: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado_proyecto"]
          id: string
          imagen_url: string | null
          nombre: string
          repo_github: string | null
          responsable_id: string | null
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_proyecto"]
          id?: string
          imagen_url?: string | null
          nombre: string
          repo_github?: string | null
          responsable_id?: string | null
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_proyecto"]
          id?: string
          imagen_url?: string | null
          nombre?: string
          repo_github?: string | null
          responsable_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proyectos_responsable_id_fkey"
            columns: ["responsable_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      es_directiva: { Args: never; Returns: boolean }
      es_miembro_activo: { Args: never; Returns: boolean }
    }
    Enums: {
      area_carrera: "programacion" | "ciberseguridad" | "redes"
      estado_proyecto: "idea" | "en_progreso" | "pausado" | "terminado"
      estado_usuario: "pendiente" | "activo" | "inactivo"
      rol_usuario: "presidente" | "vicepresidente" | "coordinador" | "miembro"
      tipo_evento:
        | "workshop"
        | "charla"
        | "hackathon"
        | "gira"
        | "stand"
        | "reunion"
      tipo_material: "link" | "documento" | "video" | "curso"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      area_carrera: ["programacion", "ciberseguridad", "redes"],
      estado_proyecto: ["idea", "en_progreso", "pausado", "terminado"],
      estado_usuario: ["pendiente", "activo", "inactivo"],
      rol_usuario: ["presidente", "vicepresidente", "coordinador", "miembro"],
      tipo_evento: [
        "workshop",
        "charla",
        "hackathon",
        "gira",
        "stand",
        "reunion",
      ],
      tipo_material: ["link", "documento", "video", "curso"],
    },
  },
} as const
