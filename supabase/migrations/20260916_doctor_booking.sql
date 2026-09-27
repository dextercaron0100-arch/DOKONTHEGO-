alter table appointments add column if not exists selected_service_name text;
alter table appointments add column if not exists selected_service_price numeric(10,2);

insert into doctors (id, full_name, specialty, consultation_fee, availability_status, is_active) values
  ('a0000001-0000-4000-8000-000000000001', 'Dr. Nina', 'Dermatology', 800, 'ONLINE', true),
  ('a0000002-0000-4000-8000-000000000002', 'Dr. Mariel', 'Endocrinology', 950, 'ONLINE', true),
  ('a0000003-0000-4000-8000-000000000003', 'Dr. Evaliza', 'Neurology', 950, 'ONLINE', true),
  ('a0000004-0000-4000-8000-000000000004', 'Dr. Ambal', 'Cardiology', 900, 'ONLINE', true),
  ('a0000005-0000-4000-8000-000000000005', 'Dr. Hans', 'Internal Medicine', 700, 'ONLINE', true),
  ('a0000006-0000-4000-8000-000000000006', 'Dr. Gef', 'Urology', 700, 'ONLINE', true),
  ('a0000007-0000-4000-8000-000000000007', 'Dr. Jane', 'Internal Medicine / Nephrology', 900, 'OFFLINE', true),
  ('a0000008-0000-4000-8000-000000000008', 'Dr. Edison', 'Medical Doctor', 900, 'OFFLINE', true),
  ('a0000009-0000-4000-8000-000000000009', 'Dr. Marc', 'Medical Doctor', 900, 'OFFLINE', true),
  ('a0000010-0000-4000-8000-000000000010', 'Dr. Pangan', 'Psychiatry', 2700, 'OFFLINE', true),
  ('a0000011-0000-4000-8000-000000000011', 'Dr. Marj', 'Obstetrics and Gynecology', 700, 'OFFLINE', true),
  ('a0000012-0000-4000-8000-000000000012', 'Dr. Olivia', 'Obstetrics and Gynecology', 700, 'OFFLINE', true),
  ('a0000013-0000-4000-8000-000000000013', 'Dr. Dulce', 'Obstetrics and Gynecology', 700, 'OFFLINE', true),
  ('a0000014-0000-4000-8000-000000000014', 'Dr. Recio', 'Hematology', 1300, 'OFFLINE', true),
  ('a0000015-0000-4000-8000-000000000015', 'Dr. Tiu', 'Gastroenterology', 800, 'OFFLINE', true),
  ('a0000016-0000-4000-8000-000000000016', 'Dr. Inigo', 'Medical Doctor', 600, 'OFFLINE', true),
  ('a0000017-0000-4000-8000-000000000017', 'Dr. Anya', 'Medical Doctor', 650, 'OFFLINE', true)
on conflict (id) do update set
  full_name = excluded.full_name,
  specialty = excluded.specialty,
  consultation_fee = excluded.consultation_fee,
  availability_status = excluded.availability_status,
  is_active = excluded.is_active;
