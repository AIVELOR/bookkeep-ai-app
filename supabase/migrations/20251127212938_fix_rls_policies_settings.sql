DROP POLICY IF EXISTS "Agency staff can view settings" ON agency_settings;
DROP POLICY IF EXISTS "Agency admins can manage settings" ON agency_settings;

CREATE POLICY "Agency staff can view settings"
  ON agency_settings FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Agency admins can manage settings"
  ON agency_settings FOR ALL
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