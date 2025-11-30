/*
  # Add Country Field to Clients Table

  1. Changes
    - Add `country` column to `clients` table
      - Type: text (stores country name or code)
      - Default: 'Sweden'
      - Not null after setting default

  2. Notes
    - This field allows each client to specify their country for bookkeeping purposes
    - Can be changed through client profile settings
    - Initially defaults to Sweden for existing clients
*/

-- Add country column to clients table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'country'
  ) THEN
    ALTER TABLE clients ADD COLUMN country text DEFAULT 'Sweden' NOT NULL;
  END IF;
END $$;