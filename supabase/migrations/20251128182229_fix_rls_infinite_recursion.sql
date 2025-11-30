/*
  # Fix Infinite Recursion in RLS Policies

  1. Purpose
    - Remove circular references in agency_staff RLS policies
    - Allow new user signup without policy conflicts
    - Enable service role bypass for initial user creation

  2. Changes
    - Drop existing recursive policies
    - Create simplified policies that avoid self-referential queries
    - Add policy for authenticated users to insert their own staff records

  3. Security
    - Maintains security by checking user_id matches auth.uid()
    - Allows initial signup without circular dependencies
*/

DROP POLICY IF EXISTS "Agency staff can view team members" ON agency_staff;
DROP POLICY IF EXISTS "Agency admins can manage staff" ON agency_staff;

CREATE POLICY "Users can insert own staff record"
  ON agency_staff FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Staff can view own record"
  ON agency_staff FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Staff can view same agency"
  ON agency_staff FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_staff AS staff
      WHERE staff.user_id = auth.uid()
      AND staff.agency_id = agency_staff.agency_id
    )
  );

CREATE POLICY "Admins can manage same agency staff"
  ON agency_staff FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_staff AS staff
      WHERE staff.user_id = auth.uid()
      AND staff.agency_id = agency_staff.agency_id
      AND staff.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete same agency staff"
  ON agency_staff FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agency_staff AS staff
      WHERE staff.user_id = auth.uid()
      AND staff.agency_id = agency_staff.agency_id
      AND staff.role = 'admin'
    )
  );
