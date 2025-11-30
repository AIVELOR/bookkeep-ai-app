/*
  # Add Country Field to Agencies Table

  1. Changes
    - Add `country` column to `agencies` table
      - Type: text (stores country name or code)
      - Default: 'Sweden'
      - Not null after setting default

  2. Notes
    - This field will be used to determine which country-specific bookkeeping account codes to use
    - Can be changed later through agency settings
*/

-- Add country column to agencies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agencies' AND column_name = 'country'
  ) THEN
    ALTER TABLE agencies ADD COLUMN country text DEFAULT 'Sweden' NOT NULL;
  END IF;
END $$;