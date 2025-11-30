CREATE POLICY "Agency staff can view settings"
  ON agency_settings FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency admins can manage settings"
  ON agency_settings FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );