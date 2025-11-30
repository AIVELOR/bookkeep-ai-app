# Database Setup Instructions

## Overview

The BookKeep AI application uses Supabase as its database. This document provides instructions for setting up the complete database schema.

## Database Schema

The application uses the following tables:

1. **agencies** - Agency/bookkeeping firm information
2. **agency_staff** - Team members working at the agency
3. **clients** - Business clients that submit receipts
4. **account_code_mappings** - Default account code mappings for expense categories
5. **receipts** - Receipt submissions from clients
6. **agency_settings** - Agency notification and configuration settings

## Setup Instructions

### Step 1: Access Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `0ec90b57d6e95fcbda19832f`
3. Navigate to **SQL Editor** in the left sidebar

### Step 2: Apply Database Schema

1. Open the file `database-schema.sql` in this project
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run** to execute the migration

This will create:
- All 6 tables with proper relationships
- Indexes for query performance
- Row Level Security (RLS) policies for data protection
- Triggers for automatic timestamp updates

### Step 3: Apply Seed Data (Optional)

For testing and development, you can populate the database with sample data:

1. Open the file `database-seed.sql` in this project
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run** to execute

This will create:
- 1 sample agency (Nordic Accounting AB)
- 2 agency staff members (Anna Svensson - Admin, Erik Larsson - Bookkeeper)
- 3 sample clients
- 4 default account code mappings
- 6 sample receipts (2 pending, 3 approved, 1 rejected)
- Agency settings

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with policies that ensure:

- **Agency Staff**: Can only access data for their own agency
- **Clients**: Can only access their own receipts and profile
- **Admins**: Have broader permissions than bookkeepers
- **Bookkeepers**: Can view and update receipts but cannot manage settings

### Authentication

The database is designed to work with Supabase Auth:

- `agency_staff.user_id` links to `auth.users`
- `clients.user_id` links to `auth.users`
- RLS policies use `auth.uid()` to verify user identity

## Database Functions

The schema includes a function for automatic timestamp updates:

- `update_updated_at_column()` - Automatically updates the `updated_at` field whenever a record is modified

## Using the Database in Your App

The Supabase client is configured in `src/lib/supabase.ts`:

```typescript
import { supabase } from '@/lib/supabase';

// Example: Fetch all pending receipts
const { data, error } = await supabase
  .from('receipts')
  .select('*')
  .eq('status', 'pending');
```

## TypeScript Types

TypeScript types for all database tables are defined in `src/lib/supabase.ts`. These types provide full IntelliSense support when working with the database.

## Troubleshooting

### Migration Fails

- Ensure you're logged into the correct Supabase project
- Check that you have sufficient permissions
- Try running the schema in smaller chunks if there are errors

### RLS Policies Not Working

- Verify users are authenticated before making queries
- Check that user_id fields are properly set after user registration
- Test policies in the Supabase Dashboard under **Authentication > Policies**

### Missing Data

- Verify the seed data was applied successfully
- Check RLS policies aren't preventing data access
- Use the SQL Editor to query tables directly: `SELECT * FROM receipts;`

## Next Steps

After setting up the database:

1. The application will automatically connect using the environment variables in `.env`
2. You can start using the client and agency portals
3. All data will be persisted in the Supabase database
4. RLS policies will automatically enforce security rules
