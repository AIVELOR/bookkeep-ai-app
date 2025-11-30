/*
  # Fix Agencies RLS Policies for Signup

  1. Purpose
    - Allow authenticated users to create new agencies during signup
    - Fix missing INSERT policy for agencies table

  2. Changes
    - Add INSERT policy for authenticated users

  3. Security
    - Any authenticated user can create an agency (needed for accountant signup)
    - Maintains existing view and update restrictions
*/

CREATE POLICY "Authenticated users can create agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK (true);
