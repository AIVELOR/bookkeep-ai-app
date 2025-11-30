/*
  # Remove Unused Indexes

  1. Purpose
    - Remove indexes that have not been used
    - Reduce database overhead and storage
    - Improve write performance

  2. Changes
    - Drop unused indexes on account_code_mappings, receipts, agency_staff, and clients
    - These indexes can be recreated later if usage patterns change

  3. Impact
    - Reduces maintenance overhead
    - Improves INSERT/UPDATE performance
    - Frees up storage space
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_account_code_mappings_agency_id;
DROP INDEX IF EXISTS idx_receipts_client_id;
DROP INDEX IF EXISTS idx_receipts_agency_id;
DROP INDEX IF EXISTS idx_receipts_status;
DROP INDEX IF EXISTS idx_receipts_date;
DROP INDEX IF EXISTS idx_receipts_reviewed_by;
DROP INDEX IF EXISTS idx_agency_staff_agency_id;
DROP INDEX IF EXISTS idx_clients_agency_id;
