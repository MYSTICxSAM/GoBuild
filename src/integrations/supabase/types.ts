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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blogs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Contractors: {
        Row: {
          created_at: string
          Description: string | null
          id: number
          Location: string | null
          Name: string | null
          Payments: string | null
          "Phone No": number | null
          "Project Details": string | null
        }
        Insert: {
          created_at?: string
          Description?: string | null
          id?: number
          Location?: string | null
          Name?: string | null
          Payments?: string | null
          "Phone No"?: number | null
          "Project Details"?: string | null
        }
        Update: {
          created_at?: string
          Description?: string | null
          id?: number
          Location?: string | null
          Name?: string | null
          Payments?: string | null
          "Phone No"?: number | null
          "Project Details"?: string | null
        }
        Relationships: []
      }
      Financial: {
        Row: {
          created_at: string
          Description: string | null
          id: number
          Income: number | null
          Name: string | null
          Profit: number | null
          TranIN: string[] | null
          TranOut: string[] | null
          UserRequestID: number | null
          WorkersID: number | null
        }
        Insert: {
          created_at?: string
          Description?: string | null
          id: number
          Income?: number | null
          Name?: string | null
          Profit?: number | null
          TranIN?: string[] | null
          TranOut?: string[] | null
          UserRequestID?: number | null
          WorkersID?: number | null
        }
        Update: {
          created_at?: string
          Description?: string | null
          id?: number
          Income?: number | null
          Name?: string | null
          Profit?: number | null
          TranIN?: string[] | null
          TranOut?: string[] | null
          UserRequestID?: number | null
          WorkersID?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Financial_UserRequestID_fkey"
            columns: ["UserRequestID"]
            isOneToOne: false
            referencedRelation: "User Request"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Financial_WorkersID_fkey"
            columns: ["WorkersID"]
            isOneToOne: false
            referencedRelation: "GoBuild"
            referencedColumns: ["id"]
          },
        ]
      }
      GoBuild: {
        Row: {
          Age: number | null
          Area: string | null
          created_at: string
          Description: string | null
          Experience: number | null
          id: number
          MobileNo: string
          Name: string | null
          Skill: string | null
          WorkerCode: string | null
        }
        Insert: {
          Age?: number | null
          Area?: string | null
          created_at?: string
          Description?: string | null
          Experience?: number | null
          id?: number
          MobileNo: string
          Name?: string | null
          Skill?: string | null
          WorkerCode?: string | null
        }
        Update: {
          Age?: number | null
          Area?: string | null
          created_at?: string
          Description?: string | null
          Experience?: number | null
          id?: number
          MobileNo?: string
          Name?: string | null
          Skill?: string | null
          WorkerCode?: string | null
        }
        Relationships: []
      }
      "Material Suppliers": {
        Row: {
          created_at: string
          History: string | null
          id: number
          Location: string | null
          Name: string | null
          "Phone Number": number | null
          Work: string | null
        }
        Insert: {
          created_at?: string
          History?: string | null
          id?: number
          Location?: string | null
          Name?: string | null
          "Phone Number"?: number | null
          Work?: string | null
        }
        Update: {
          created_at?: string
          History?: string | null
          id?: number
          Location?: string | null
          Name?: string | null
          "Phone Number"?: number | null
          Work?: string | null
        }
        Relationships: []
      }
      "Monthly Workers": {
        Row: {
          Attendence: number | null
          created_at: string
          id: number
          Location: string | null
          Name: string | null
          Payment: number | null
          PhoneNo: number | null
        }
        Insert: {
          Attendence?: number | null
          created_at?: string
          id?: number
          Location?: string | null
          Name?: string | null
          Payment?: number | null
          PhoneNo?: number | null
        }
        Update: {
          Attendence?: number | null
          created_at?: string
          id?: number
          Location?: string | null
          Name?: string | null
          Payment?: number | null
          PhoneNo?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          PhoneNo: number | null
          updated_at: string
          user_role: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          PhoneNo?: number | null
          updated_at?: string
          user_role?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          PhoneNo?: number | null
          updated_at?: string
          user_role?: string
        }
        Relationships: []
      }
      Review: {
        Row: {
          created_at: string
          "Customer Name": string
          "Customer Review": string | null
          id: number
          Rating: number
        }
        Insert: {
          created_at?: string
          "Customer Name": string
          "Customer Review"?: string | null
          id?: number
          Rating: number
        }
        Update: {
          created_at?: string
          "Customer Name"?: string
          "Customer Review"?: string | null
          id?: number
          Rating?: number
        }
        Relationships: []
      }
      "User Request": {
        Row: {
          created_at: string
          DateOfService: string | null
          hdfu: string | null
          id: number
          Location: string | null
          Name: string | null
          Phone: string | null
          Results: boolean | null
          Results_description: string | null
          ServiceType: string | null
        }
        Insert: {
          created_at?: string
          DateOfService?: string | null
          hdfu?: string | null
          id?: number
          Location?: string | null
          Name?: string | null
          Phone?: string | null
          Results?: boolean | null
          Results_description?: string | null
          ServiceType?: string | null
        }
        Update: {
          created_at?: string
          DateOfService?: string | null
          hdfu?: string | null
          id?: number
          Location?: string | null
          Name?: string | null
          Phone?: string | null
          Results?: boolean | null
          Results_description?: string | null
          ServiceType?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
