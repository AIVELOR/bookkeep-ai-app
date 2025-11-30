import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      agencies: {
        Row: {
          id: string;
          name: string;
          organization_number: string;
          address: string;
          phone: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['agencies']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['agencies']['Insert']>;
      };
      agency_staff: {
        Row: {
          id: string;
          agency_id: string;
          user_id: string | null;
          name: string;
          email: string;
          role: 'admin' | 'bookkeeper';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['agency_staff']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['agency_staff']['Insert']>;
      };
      clients: {
        Row: {
          id: string;
          agency_id: string;
          user_id: string | null;
          name: string;
          company_name: string;
          organization_number: string;
          email: string;
          phone: string;
          address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['clients']['Insert']>;
      };
      account_code_mappings: {
        Row: {
          id: string;
          agency_id: string;
          category: string;
          debit_account: string;
          credit_account: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['account_code_mappings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['account_code_mappings']['Insert']>;
      };
      receipts: {
        Row: {
          id: string;
          client_id: string;
          agency_id: string;
          merchant_name: string;
          date: string;
          total_amount: number;
          vat_amount: number;
          receipt_number: string | null;
          category: string;
          description: string;
          debit_account: string | null;
          credit_account: string | null;
          status: 'pending' | 'approved' | 'rejected';
          rejection_reason: string | null;
          image_url: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['receipts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['receipts']['Insert']>;
      };
      agency_settings: {
        Row: {
          id: string;
          agency_id: string;
          email_on_new_submission: boolean;
          daily_summary_report: boolean;
          weekly_analytics: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['agency_settings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['agency_settings']['Insert']>;
      };
    };
  };
};
