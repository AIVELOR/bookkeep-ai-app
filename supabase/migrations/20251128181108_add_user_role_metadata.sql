/*
  # Add User Role Support for Authentication

  1. Purpose
    - Enable role-based authentication for clients and accountants
    - Support seamless role-based routing after login

  2. Changes
    - Update clients table to allow NULL agency_id for self-signup
    - Update clients table to allow empty strings for optional fields
    - Add indexes for user_id lookups in both clients and agency_staff tables

  3. Security
    - Maintains existing RLS policies
    - No changes to access control
*/

DO $$
BEGIN
  ALTER TABLE clients ALTER COLUMN agency_id DROP NOT NULL;
  ALTER TABLE clients ALTER COLUMN company_name DROP NOT NULL;
  ALTER TABLE clients ALTER COLUMN organization_number DROP NOT NULL;
  ALTER TABLE clients ALTER COLUMN phone DROP NOT NULL;
  ALTER TABLE clients ALTER COLUMN address DROP NOT NULL;
EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Columns already nullable or error: %', SQLERRM;
END $$;

CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_agency_staff_user_id ON agency_staff(user_id);
