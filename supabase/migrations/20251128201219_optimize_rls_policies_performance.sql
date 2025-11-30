/*
  # Optimize RLS Policies for Performance

  1. Purpose
    - Fix RLS policies that re-evaluate auth.uid() for each row
    - Improve query performance by using (select auth.uid())
    - Maintain same security while optimizing execution

  2. Changes
    - Replace auth.uid() with (select auth.uid()) in all policies
    - Affects agency_staff and clients tables

  3. Performance Impact
    - Prevents re-evaluation of auth function for each row
    - Significantly improves performance at scale
*/

-- Optimize agency_staff policies
DROP POLICY IF EXISTS "staff_insert_own" ON agency_staff;
DROP POLICY IF EXISTS "staff_select_own" ON agency_staff;
DROP POLICY IF EXISTS "staff_update_own" ON agency_staff;
DROP POLICY IF EXISTS "staff_delete_own" ON agency_staff;

CREATE POLICY "staff_insert_own"
  ON agency_staff FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "staff_select_own"
  ON agency_staff FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "staff_update_own"
  ON agency_staff FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "staff_delete_own"
  ON agency_staff FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Optimize clients policies
DROP POLICY IF EXISTS "clients_insert_own" ON clients;
DROP POLICY IF EXISTS "clients_select_own" ON clients;
DROP POLICY IF EXISTS "clients_update_own" ON clients;
DROP POLICY IF EXISTS "clients_delete_own" ON clients;

CREATE POLICY "clients_insert_own"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "clients_select_own"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "clients_update_own"
  ON clients FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "clients_delete_own"
  ON clients FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));
