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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      app_gallery: {
        Row: {
          app_url: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon_url: string | null
          id: string
          is_featured: boolean | null
          name: string
        }
        Insert: {
          app_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
        }
        Update: {
          app_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
        }
        Relationships: []
      }
      community_applications: {
        Row: {
          channel_interest: string[] | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          referral_name: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          why_join: string
        }
        Insert: {
          channel_interest?: string[] | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          referral_name?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          why_join: string
        }
        Update: {
          channel_interest?: string[] | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          referral_name?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          why_join?: string
        }
        Relationships: []
      }
      community_events: {
        Row: {
          channel: string | null
          created_at: string | null
          description: string | null
          event_date: string
          id: string
          is_members_only: boolean | null
          location: string | null
          max_attendees: number | null
          title: string
        }
        Insert: {
          channel?: string | null
          created_at?: string | null
          description?: string | null
          event_date: string
          id?: string
          is_members_only?: boolean | null
          location?: string | null
          max_attendees?: number | null
          title: string
        }
        Update: {
          channel?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          id?: string
          is_members_only?: boolean | null
          location?: string | null
          max_attendees?: number | null
          title?: string
        }
        Relationships: []
      }
      community_members: {
        Row: {
          application_id: string | null
          channels_access: string[] | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          user_id: string
        }
        Insert: {
          application_id?: string | null
          channels_access?: string[] | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          user_id: string
        }
        Update: {
          application_id?: string | null
          channels_access?: string[] | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "community_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      device_fingerprints: {
        Row: {
          fingerprint_hash: string
          first_seen_at: string | null
          id: string
          language: string | null
          last_seen_at: string | null
          platform: string | null
          screen_resolution: string | null
          session_id: string | null
          timezone: string | null
          total_generations: number | null
          user_agent: string | null
        }
        Insert: {
          fingerprint_hash: string
          first_seen_at?: string | null
          id?: string
          language?: string | null
          last_seen_at?: string | null
          platform?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          total_generations?: number | null
          user_agent?: string | null
        }
        Update: {
          fingerprint_hash?: string
          first_seen_at?: string | null
          id?: string
          language?: string | null
          last_seen_at?: string | null
          platform?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          total_generations?: number | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_fingerprints_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          click_x: number | null
          click_y: number | null
          created_at: string
          element_clicked: string | null
          event_data: Json | null
          event_type: string
          id: string
          page_url: string | null
          session_id: string | null
        }
        Insert: {
          click_x?: number | null
          click_y?: number | null
          created_at?: string
          element_clicked?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          page_url?: string | null
          session_id?: string | null
        }
        Update: {
          click_x?: number | null
          click_y?: number | null
          created_at?: string
          element_clicked?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          page_url?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_cartoons: {
        Row: {
          created_at: string
          error_message: string | null
          generation_duration_ms: number | null
          id: string
          image_url: string
          session_id: string
          style_id: string
          success: boolean | null
          upload_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          generation_duration_ms?: number | null
          id?: string
          image_url: string
          session_id: string
          style_id: string
          success?: boolean | null
          upload_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          generation_duration_ms?: number | null
          id?: string
          image_url?: string
          session_id?: string
          style_id?: string
          success?: boolean | null
          upload_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_cartoons_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_cartoons_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_limits: {
        Row: {
          created_at: string | null
          fingerprint_hash: string
          generation_count: number | null
          generation_date: string
          id: string
          is_tlc_friend: boolean | null
        }
        Insert: {
          created_at?: string | null
          fingerprint_hash: string
          generation_count?: number | null
          generation_date?: string
          id?: string
          is_tlc_friend?: boolean | null
        }
        Update: {
          created_at?: string | null
          fingerprint_hash?: string
          generation_count?: number | null
          generation_date?: string
          id?: string
          is_tlc_friend?: boolean | null
        }
        Relationships: []
      }
      podcast_episodes: {
        Row: {
          audio_url: string | null
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          episode_number: number | null
          id: string
          is_published: boolean | null
          published_at: string | null
          title: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          episode_number?: number | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          title: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          episode_number?: number | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          title?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          category: string | null
          chapter_number: number | null
          content: string
          content_warning_text: string | null
          created_at: string | null
          excerpt: string | null
          has_content_warning: boolean | null
          id: string
          is_published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          chapter_number?: number | null
          content: string
          content_warning_text?: string | null
          created_at?: string | null
          excerpt?: string | null
          has_content_warning?: boolean | null
          id?: string
          is_published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          chapter_number?: number | null
          content?: string
          content_warning_text?: string | null
          created_at?: string | null
          excerpt?: string | null
          has_content_warning?: boolean | null
          id?: string
          is_published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      slide_decks: {
        Row: {
          created_at: string | null
          description: string | null
          file_url: string
          id: string
          is_published: boolean | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_url: string
          id?: string
          is_published?: boolean | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_url?: string
          id?: string
          is_published?: boolean | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      tlc_friends: {
        Row: {
          added_by: string | null
          created_at: string | null
          daily_limit: number | null
          email: string
          id: string
          name: string | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          daily_limit?: number | null
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          daily_limit?: number | null
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      uploads: {
        Row: {
          created_at: string
          faces_detected: number | null
          file_size: number | null
          file_url: string
          id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          faces_detected?: number | null
          file_size?: number | null
          file_url: string
          id?: string
          session_id: string
        }
        Update: {
          created_at?: string
          faces_detected?: number | null
          file_size?: number | null
          file_url?: string
          id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploads_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          device: string | null
          fingerprint_hash: string | null
          id: string
          ip_hash: string | null
          is_admin: boolean | null
          is_tlc_friend: boolean | null
          language: string | null
          last_activity: string
          latitude: number | null
          longitude: number | null
          platform: string | null
          referrer: string | null
          region: string | null
          screen_resolution: string | null
          session_uuid: string
          timezone: string | null
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          device?: string | null
          fingerprint_hash?: string | null
          id?: string
          ip_hash?: string | null
          is_admin?: boolean | null
          is_tlc_friend?: boolean | null
          language?: string | null
          last_activity?: string
          latitude?: number | null
          longitude?: number | null
          platform?: string | null
          referrer?: string | null
          region?: string | null
          screen_resolution?: string | null
          session_uuid?: string
          timezone?: string | null
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          device?: string | null
          fingerprint_hash?: string | null
          id?: string
          ip_hash?: string | null
          is_admin?: boolean | null
          is_tlc_friend?: boolean | null
          language?: string | null
          last_activity?: string
          latitude?: number | null
          longitude?: number | null
          platform?: string | null
          referrer?: string | null
          region?: string | null
          screen_resolution?: string | null
          session_uuid?: string
          timezone?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
