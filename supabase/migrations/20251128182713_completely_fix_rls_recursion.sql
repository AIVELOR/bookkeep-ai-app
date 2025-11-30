/*
  # Completely Fix RLS Infinite Recursion

  1. Purpose
    - Remove ALL recursive policies causing infinite loops
    - Create simple, non-recursive policies
    - Allow signup and signin to work properly

  2. Strategy
    - Drop ALL existing policies on agency_staff
    - Create minimal policies that don't reference the same table

  3. Security
    - Users can manage their own records
    - Agency operations are controlled by user_id matching
*/

-- Drop all existing policies on agency_staff
DROP POLICY IF EXISTS "Users can insert own staff record" ON agency_staff;
DROP POLICY IF EXISTS "Staff can view own record" ON agency_staff;
DROP POLICY IF EXISTS "Staff can view same agency" ON agency_staff;
DROP POLICY IF EXISTS "Admins can manage same agency staff" ON agency_staff;
DROP POLICY IF EXISTS "Admins can delete same agency staff" ON agency_staff;
DROP POLICY IF EXISTS "Agency staff can view team members" ON agency_staff;
DROP POLICY IF EXISTS "Agency admins can manage staff" ON agency_staff;

-- Create simple, non-recursive policies
CREATE POLICY "staff_insert_own"
  ON agency_staff FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "staff_select_own"
  ON agency_staff FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "staff_update_own"
  ON agency_staff FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "staff_delete_own"
  ON agency_staff FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
