CREATE POLICY "Agency staff can view account codes"
  ON account_code_mappings FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Agency admins can manage account codes"
  ON account_code_mappings FOR ALL
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