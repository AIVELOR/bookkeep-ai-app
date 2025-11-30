DROP POLICY IF EXISTS "Agency staff can view their agency" ON agencies;
DROP POLICY IF EXISTS "Agency admins can update their agency" ON agencies;

CREATE POLICY "Agency staff can view their agency"
  ON agencies FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Agency admins can update their agency"
  ON agencies FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = (SELECT auth.uid()) AND role = 'admin'
    )
  )
  WITH CHECK (
    id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = (SELECT auth.uid()) AND role = 'admin'
    )
  );