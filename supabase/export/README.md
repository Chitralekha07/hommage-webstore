# Migrating Hommage to your own Supabase project

## 1. Create the project
Create a new project at supabase.com. Note the region and set a database password you keep.

## 2. Run the SQL (SQL Editor → New query, in this order)
1. `01_schema.sql` — types, tables, RLS policies, grants, triggers, `media` storage bucket
2. `02_data.sql` — hero settings row + existing enquiry submissions
3. `03_admin_setup.sql` — after creating your admin user in Authentication → Users

## 3. Collect the keys
Project Settings → API:
- Project URL
- `anon` / publishable key
- `service_role` key (Project Settings → API → reveal)

## 4. Netlify environment variables
| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | your project URL |
| `SUPABASE_URL` | same |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | anon/publishable key |
| `SUPABASE_PUBLISHABLE_KEY` | same |
| `VITE_SUPABASE_PROJECT_ID` | project ref (subdomain of the URL) |
| `SUPABASE_PROJECT_ID` | same |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (never commit this) |

Build command: `npm run build` · Publish directory: `dist` · Node 22.

## 5. Media files
Uploaded event/journal/hero media lives in the private `media` storage bucket. It does not
transfer automatically — after switching, re-upload media through `/admin`, or download the
files from the current bucket and upload them into the new project's `media` bucket keeping
the same paths.

## 6. Notes
- `posts` is empty; all Events / Journal / Upcoming content is created through `/admin`.
- Auth users cannot be copied between projects — recreate the admin login (step 3).
- The Google Apps Script endpoints (contact + hampers) need no changes.
