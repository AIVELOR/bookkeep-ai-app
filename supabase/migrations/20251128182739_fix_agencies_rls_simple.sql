/*
  # Simplify Agencies RLS Policies

  1. Purpose
    - Remove recursive agency policies
    - Allow authenticated users to create and manage agencies

  2. Changes
    - Drop all existing policies
    - Create simple policies for agency management

  3. Security
    - Any authenticated user can create an agency
    - Users can view/update agencies (simplified for now)
*/

-- Drop all existing policies on agencies
DROP POLICY IF EXISTS "Authenticated users can create agencies" ON agencies;
DROP POLICY IF EXISTS "Agency staff can view their agency" ON agencies;
DROP POLICY IF EXISTS "Agency admins can update their agency" ON agencies;

-- Create simple policies
CREATE POLICY "agencies_insert"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "agencies_select"
  ON agencies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "agencies_update"
  ON agencies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
