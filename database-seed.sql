/*
  # BookKeep AI Seed Data

  ## Overview
  This file contains sample data to populate the BookKeep AI database for testing and development.

  ## Instructions
  1. First apply the database-schema.sql file
  2. Then apply this seed data file
  3. Run this in Supabase SQL Editor after the schema is created
*/

-- Insert sample agency
INSERT INTO agencies (id, name, organization_number, address, phone, email)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Nordic Accounting AB',
  '559876-5432',
  'Avenyn 45, 411 36 Göteborg',
  '+46 31 789 1234',
  'info@nordicaccounting.se'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample agency staff
-- Note: user_id values should be replaced with actual auth.users IDs after user registration
INSERT INTO agency_staff (id, agency_id, user_id, name, email, role)
VALUES
  (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'Anna Svensson',
    'admin@agency.se',
    'admin'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'Erik Larsson',
    'erik@agency.se',
    'bookkeeper'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample clients
INSERT INTO clients (id, agency_id, user_id, name, company_name, organization_number, email, phone, address)
VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'John Doe',
    'ABC Consulting AB',
    '556789-1234',
    'john.doe@company.com',
    '+46 70 123 4567',
    'Kungsgatan 12, 411 19 Göteborg'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'Jane Smith',
    'Tech Solutions AB',
    '556123-4567',
    'jane.smith@techsolutions.se',
    '+46 70 234 5678',
    'Storgatan 20, 411 20 Göteborg'
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'Mike Johnson',
    'Design Studio AB',
    '556456-7890',
    'mike@designstudio.se',
    '+46 70 345 6789',
    'Vasagatan 15, 411 21 Göteborg'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert default account code mappings
INSERT INTO account_code_mappings (agency_id, category, debit_account, credit_account)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Office Supplies', '5410', '2440'),
  ('11111111-1111-1111-1111-111111111111', 'Travel', '5610', '2440'),
  ('11111111-1111-1111-1111-111111111111', 'Meals', '5811', '2440'),
  ('11111111-1111-1111-1111-111111111111', 'Equipment', '5010', '2440')
ON CONFLICT (agency_id, category) DO NOTHING;

-- Insert sample receipts
INSERT INTO receipts (
  client_id,
  agency_id,
  merchant_name,
  date,
  total_amount,
  vat_amount,
  receipt_number,
  category,
  description,
  debit_account,
  credit_account,
  status,
  rejection_reason,
  image_url
)
VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    '11111111-1111-1111-1111-111111111111',
    'ICA Supermarket',
    '2025-11-27',
    450.00,
    90.00,
    '12345',
    'Office Supplies',
    'Coffee and snacks for office',
    '5410',
    '2440',
    'pending',
    NULL,
    'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    'Circle K',
    '2025-11-26',
    280.00,
    56.00,
    '67890',
    'Travel',
    'Fuel for business trip',
    '5610',
    '2440',
    'approved',
    NULL,
    'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80'
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    '11111111-1111-1111-1111-111111111111',
    'Staples',
    '2025-11-25',
    1250.00,
    250.00,
    'INV-2025',
    'Office Supplies',
    'Printer paper and office supplies',
    '5410',
    '2440',
    'pending',
    NULL,
    'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    '11111111-1111-1111-1111-111111111111',
    'McDonald''s',
    '2025-11-24',
    125.00,
    25.00,
    '789',
    'Meals',
    'Lunch meeting with client',
    '5811',
    '2440',
    'rejected',
    'Receipt image is unclear. Please resubmit with a clearer photo.',
    'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    'Shell',
    '2025-11-23',
    340.00,
    68.00,
    'SHELL-456',
    'Travel',
    'Fuel for client visit',
    '5610',
    '2440',
    'approved',
    NULL,
    'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80'
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    '11111111-1111-1111-1111-111111111111',
    'IKEA',
    '2025-11-22',
    890.00,
    178.00,
    'IKEA-789',
    'Equipment',
    'Desk and chair for new employee',
    '5010',
    '2440',
    'approved',
    NULL,
    'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80'
  )
ON CONFLICT DO NOTHING;

-- Insert agency settings
INSERT INTO agency_settings (agency_id, email_on_new_submission, daily_summary_report, weekly_analytics)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  true,
  true,
  false
) ON CONFLICT (agency_id) DO NOTHING;

-- Display confirmation message
SELECT 'Database seeded successfully!' as message,
       (SELECT COUNT(*) FROM agencies) as agencies,
       (SELECT COUNT(*) FROM agency_staff) as staff_members,
       (SELECT COUNT(*) FROM clients) as clients,
       (SELECT COUNT(*) FROM account_code_mappings) as account_mappings,
       (SELECT COUNT(*) FROM receipts) as receipts,
       (SELECT COUNT(*) FROM agency_settings) as settings;
