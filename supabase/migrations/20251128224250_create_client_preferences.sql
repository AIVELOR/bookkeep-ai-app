/*
  # Create client preferences table

  1. New Tables
    - `client_preferences`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients.id)
      - `email_notifications` (boolean) - Enable/disable email notifications
      - `sms_notifications` (boolean) - Enable/disable SMS notifications
      - `auto_save_drafts` (boolean) - Enable/disable auto-save functionality
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `client_preferences` table
    - Add policies for clients to read and update their own preferences

  3. Notes
    - Each client has one preferences record
    - Default values set for new records
*/

CREATE TABLE IF NOT EXISTS client_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE UNIQUE,
  email_notifications boolean DEFAULT true,
  sms_notifications boolean DEFAULT false,
  auto_save_drafts boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE client_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own preferences"
  ON client_preferences FOR SELECT
  TO authenticated
  USING (client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  ));

CREATE POLICY "Clients can update own preferences"
  ON client_preferences FOR UPDATE
  TO authenticated
  USING (client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  ))
  WITH CHECK (client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  ));

CREATE POLICY "Clients can insert own preferences"
  ON client_preferences FOR INSERT
  TO authenticated
  WITH CHECK (client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  ));
