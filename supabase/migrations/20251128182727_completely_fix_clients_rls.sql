/*
  # Fix Clients RLS Policies - Remove Recursion

  1. Purpose
    - Remove ALL recursive policies on clients table
    - Allow clients to manage their own data
    - Simplify agency staff access

  2. Changes
    - Drop all existing policies
    - Create simple policies based on user_id only
    - Remove cross-table references that cause recursion

  3. Security
    - Users can only access their own client records
*/

-- Drop all existing policies on clients
DROP POLICY IF EXISTS "Users can insert own client record" ON clients;
DROP POLICY IF EXISTS "Clients can view own data" ON clients;
DROP POLICY IF EXISTS "Clients can update own data" ON clients;
DROP POLICY IF EXISTS "Staff can view agency clients" ON clients;
DROP POLICY IF EXISTS "Staff can manage agency clients" ON clients;
DROP POLICY IF EXISTS "Clients can view their own data" ON clients;
DROP POLICY IF EXISTS "Agency staff can view their clients" ON clients;
DROP POLICY IF EXISTS "Agency staff can manage clients" ON clients;

-- Create simple, non-recursive policies
CREATE POLICY "clients_insert_own"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "clients_select_own"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "clients_update_own"
  ON clients FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "clients_delete_own"
  ON clients FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
