CREATE TABLE IF NOT EXISTS receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  merchant_name text NOT NULL,
  date date NOT NULL,
  total_amount numeric(10, 2) NOT NULL DEFAULT 0,
  vat_amount numeric(10, 2) NOT NULL DEFAULT 0,
  receipt_number text,
  category text NOT NULL,
  description text DEFAULT '',
  debit_account text,
  credit_account text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason text,
  image_url text,
  reviewed_by uuid REFERENCES agency_staff(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES agencies(id) ON DELETE CASCADE UNIQUE,
  email_on_new_submission boolean DEFAULT true,
  daily_summary_report boolean DEFAULT true,
  weekly_analytics boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);