-- Hommage — data export (run AFTER 01_schema.sql)
-- posts: currently empty (all Events/Journal/Upcoming content is added via /admin)

-- site_settings: homepage hero configuration
insert into public.site_settings (id, hero_url, hero_type, hero_aspect)
values ('main', null, null, 'full')
on conflict (id) do nothing;

-- enquiries: existing contact-form submissions
insert into public.enquiries (name, email, phone, organisation, enquiry_type, location, message, created_at) values
  ('Test Vendor', 'test@example.com', null, null, 'other', null,
   'We would love to collaborate on a residency at our property.', '2026-07-31 13:03:53.25415+00'),
  ('Marketing MAYU', 'marketing@worldofmayu.com', '09370848246', 'Hotel Balaji Sarovar', 'other', 'Solapur',
   'Website enquiry form check', '2026-08-03 12:16:22.327868+00');

-- user_roles: NOT exported — auth users cannot be copied across projects.
-- Create your admin user first (see 03_admin_setup.sql), then grant the role.
