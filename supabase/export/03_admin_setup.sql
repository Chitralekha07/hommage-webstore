-- Hommage — admin user setup (run AFTER 01_schema.sql)
--
-- Step 1: In your own Supabase dashboard, go to Authentication → Users → "Add user"
--         Email: marketing@worldofmayu.com   (or any email you prefer)
--         Password: choose one; tick "Auto Confirm User".
--
-- Step 2: Run this to grant that user the admin role.

insert into public.user_roles (user_id, role)
select id, 'admin'::public.app_role
from auth.users
where email = 'marketing@worldofmayu.com'
on conflict (user_id, role) do nothing;

-- Verify:
-- select u.email, r.role from public.user_roles r join auth.users u on u.id = r.user_id;
