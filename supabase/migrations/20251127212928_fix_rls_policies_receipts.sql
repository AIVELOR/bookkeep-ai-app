DROP POLICY IF EXISTS "Clients can view their own receipts" ON receipts;
DROP POLICY IF EXISTS "Clients can create their own receipts" ON receipts;
DROP POLICY IF EXISTS "Agency staff can view all receipts" ON receipts;
DROP POLICY IF EXISTS "Agency staff can update receipts" ON receipts;

CREATE POLICY "Clients can view their own receipts"
  ON receipts FOR SELECT
  TO authenticated
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Clients can create their own receipts"
  ON receipts FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id IN (
      SELECT id FROM clients WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Agency staff can view all receipts"
  ON receipts FOR SELECT
  TO authenticated
  USING (
    agency_id IN (
      SELECT agency_id FROM agency_staff WHERE user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Agency staff can update receipts"
  ON receipts FOR UPDATE
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