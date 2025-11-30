/*
  # Add onboarding fields to clients table

  1. Changes
    - Add `onboarding_completed` (boolean) - Whether user completed onboarding
    - Add `city` (text) - User's city
    - Add `postal_code` (text) - User's postal code
    - Add `company_address` (text) - Company address if different from personal
    - Add `vat_number` (text) - Optional VAT number
    - Add `completed_at` (timestamptz) - When onboarding was completed

  2. Notes
    - All new fields are optional initially
    - Default onboarding_completed to false
    - Existing address field will be used for street address
    - company_name and organization_number already exist
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'onboarding_completed'
  ) THEN
    ALTER TABLE clients ADD COLUMN onboarding_completed boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'city'
  ) THEN
    ALTER TABLE clients ADD COLUMN city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'postal_code'
  ) THEN
    ALTER TABLE clients ADD COLUMN postal_code text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'company_address'
  ) THEN
    ALTER TABLE clients ADD COLUMN company_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'vat_number'
  ) THEN
    ALTER TABLE clients ADD COLUMN vat_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE clients ADD COLUMN completed_at timestamptz;
  END IF;
END $$;
