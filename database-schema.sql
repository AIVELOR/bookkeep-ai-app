/*
  # BookKeep AI Database Schema

  ## Overview
  This migration creates the complete database schema for the BookKeep AI application,
  including tables for agencies, clients, receipts, account codes, team members, and settings.

  ## Tables Created

  ### 1. agencies - Agency/bookkeeping firm information
  ### 2. agency_staff - Team members working at the agency
  ### 3. clients - Business clients that submit receipts
  ### 4. account_code_mappings - Default account code mappings for expense categories
  ### 5. receipts - Receipt submissions from clients
  ### 6. agency_settings - Agency notification and configuration settings

  ## Security
  - RLS enabled on all tables
  - Policies restrict access based on user role and agency membership
  - Staff can only access data for their agency
  - Clients can only access their own data

  ## Instructions
  To apply this schema to your Supabase database:
  1. Go to your Supabase Dashboard: https://supabase.com/dashboard
  2. Navigate to SQL Editor
  3. Copy and paste this entire file
  4. Click "Run" to execute the migration
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Create agencies table
CREATE TABLE IF NOT EXISTS agencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization_number text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agency_staff table
CREATE TABLE IF NOT EXISTS agency_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'bookkeeper')),
  created_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  company_name text NOT NULL,
  organization_number text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create account_code_mappings table
CREATE TABLE IF NOT EXISTS account_code_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  category text NOT NULL,
  debit_account text NOT NULL,
  credit_account text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(agency_id, category)
);

-- Create receipts table
CREATE TABLE IF NOT EXISTS receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  merchant_name text NOT NULL,
  date date NOT NULL,
  total_amount numeric(10, 2) NOT NULL DEFAULT 0,
  vat_amount numeric(10, 2) NOT NULL DEFAULT 0,
  receipt_number text,
  category text NOT NULL,
  description text DEFAULT '',
  debit_account text,
  credit_account text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason text,
  image_url text,
  reviewed_by uuid REFERENCES agency_staff(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agency_settings table
CREATE TABLE IF NOT EXISTS agency_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE UNIQUE,
  email_on_new_submission boolean DEFAULT true,
  daily_summary_report boolean DEFAULT true,
  weekly_analytics boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_agency_staff_agency_id ON agency_staff(agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_staff_user_id ON agency_staff(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_agency_id ON clients(agency_id);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_account_code_mappings_agency_id ON account_code_mappings(agency_id);
CREATE INDEX IF NOT EXISTS idx_receipts_client_id ON receipts(client_id);
CREATE INDEX IF NOT EXISTS idx_receipts_agency_id ON receipts(agency_id);
CREATE INDEX IF NOT EXISTS idx_receipts_status ON receipts(status);
CREATE INDEX IF NOT EXISTS idx_receipts_date ON receipts(date DESC);
CREATE INDEX IF NOT EXISTS idx_receipts_reviewed_by ON receipts(reviewed_by);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_code_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agencies table
CREATE POLICY "Agency staff can view their agency"
  ON agencies FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency admins can update their agency"
  ON agencies FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for agency_staff table
CREATE POLICY "Agency staff can view team members"
  ON agency_staff FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency admins can manage staff"
  ON agency_staff FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for clients table
CREATE POLICY "Clients can view their own data"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Agency staff can view their clients"
  ON clients FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency staff can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for account_code_mappings table
CREATE POLICY "Agency staff can view account codes"
  ON account_code_mappings FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency admins can manage account codes"
  ON account_code_mappings FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for receipts table
CREATE POLICY "Clients can view their own receipts"
  ON receipts FOR SELECT
  TO authenticated
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can create their own receipts"
  ON receipts FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency staff can view all receipts"
  ON receipts FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency staff can update receipts"
  ON receipts FOR UPDATE
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for agency_settings table
CREATE POLICY "Agency staff can view settings"
  ON agency_settings FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency admins can manage settings"
  ON agency_settings FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_agencies_updated_at ON agencies;
CREATE TRIGGER update_agencies_updated_at
  BEFORE UPDATE ON agencies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_account_code_mappings_updated_at ON account_code_mappings;
CREATE TRIGGER update_account_code_mappings_updated_at
  BEFORE UPDATE ON account_code_mappings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_receipts_updated_at ON receipts;
CREATE TRIGGER update_receipts_updated_at
  BEFORE UPDATE ON receipts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agency_settings_updated_at ON agency_settings;
CREATE TRIGGER update_agency_settings_updated_at
  BEFORE UPDATE ON agency_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
