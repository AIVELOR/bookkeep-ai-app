/*
  # Fix Clients RLS Policies for Signup

  1. Purpose
    - Allow new clients to create their own records during signup
    - Fix potential circular references in client policies

  2. Changes
    - Add INSERT policy for authenticated users to create their own client record
    - Simplify existing policies to avoid recursion

  3. Security
    - Users can only insert records with their own user_id
    - Maintains view and update restrictions
*/

DROP POLICY IF EXISTS "Clients can view their own data" ON clients;
DROP POLICY IF EXISTS "Agency staff can view their clients" ON clients;
DROP POLICY IF EXISTS "Agency staff can manage clients" ON clients;

CREATE POLICY "Users can insert own client record"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Clients can view own data"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Clients can update own data"
  ON clients FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Staff can view agency clients"
  ON clients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_staff
      WHERE agency_staff.user_id = auth.uid()
      AND agency_staff.agency_id = clients.agency_id
    )
  );

CREATE POLICY "Staff can manage agency clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_staff
      WHERE agency_staff.user_id = auth.uid()
      AND agency_staff.agency_id = clients.agency_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM agency_staff
      WHERE agency_staff.user_id = auth.uid()
      AND agency_staff.agency_id = clients.agency_id
    )
  );
