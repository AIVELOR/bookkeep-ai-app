DROP POLICY IF EXISTS "Clients can view their own data" ON clients;
DROP POLICY IF EXISTS "Agency staff can view their clients" ON clients;
DROP POLICY IF EXISTS "Agency staff can manage clients" ON clients;

CREATE POLICY "Clients can view their own data"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Agency staff can view their clients"
  ON clients FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Agency staff can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  );