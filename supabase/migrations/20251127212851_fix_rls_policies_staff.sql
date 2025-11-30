DROP POLICY IF EXISTS "Agency staff can view team members" ON agency_staff;
DROP POLICY IF EXISTS "Agency admins can manage staff" ON agency_staff;

CREATE POLICY "Agency staff can view team members"
  ON agency_staff FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Agency admins can manage staff"
  ON agency_staff FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = (SELECT auth.uid()) AND role = 'admin'
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = (SELECT auth.uid()) AND role = 'admin'
    )
  );