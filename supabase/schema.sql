create extension if not exists pgcrypto;

create type appointment_status as enum ('PENDING_PAYMENT', 'PAID', 'CONFIRMED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'REFUNDED');
create type payment_status as enum ('PENDING', 'PAID', 'FAILED', 'EXPIRED', 'REFUNDED');

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  duration_minutes integer not null default 30,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  specialty text not null,
  bio text,
  consultation_fee numeric(10,2) not null default 0,
  availability_status text not null default 'OFFLINE' check (availability_status in ('ONLINE', 'SCHEDULED', 'OFFLINE')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table doctors add column if not exists auth_user_id uuid unique;

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  appointment_number text not null unique,
  service_id uuid not null references services(id),
  doctor_id uuid references doctors(id),
  selected_service_name text,
  selected_service_price numeric(10,2),
  patient_name text not null,
  patient_email text not null,
  patient_mobile text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text,
  status appointment_status not null default 'PENDING_PAYMENT',
  payment_status payment_status not null default 'PENDING',
  xendit_payment_id text,
  xendit_session_id text,
  payment_url text,
  facebook_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists medical_records (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  doctor_id uuid not null references doctors(id),
  appointment_id uuid references appointments(id),
  record_type text not null default 'Consultation',
  summary text not null,
  created_at timestamptz not null default now()
);

create index if not exists appointments_schedule_idx on appointments (appointment_date, appointment_time);
create index if not exists appointments_status_idx on appointments (status, payment_status);

alter table appointments add column if not exists xendit_session_id text;
alter table appointments add column if not exists payment_url text;
alter table appointments add column if not exists selected_service_name text;
alter table appointments add column if not exists selected_service_price numeric(10,2);

insert into doctors (id, full_name, specialty, consultation_fee, availability_status, is_active) values
  ('a0000001-0000-4000-8000-000000000001', 'Dr. Maria Jenina Aguado-De Chavez', 'Dermatology', 800, 'ONLINE', true),
  ('a0000002-0000-4000-8000-000000000002', 'Dr. Mariel C. Enverga', 'Internal Medicine / Endocrinology / Diabetes and Metabolism', 950, 'ONLINE', true),
  ('a0000003-0000-4000-8000-000000000003', 'Dr. Evaliza Therese D. Villoria', 'Neurology', 950, 'ONLINE', true),
  ('a0000004-0000-4000-8000-000000000004', 'Dr. Rossel Anjelo A. Ambal', 'Internal Medicine / Adult Cardiology', 900, 'ONLINE', true),
  ('a0000005-0000-4000-8000-000000000005', 'Dr. Hans', 'Internal Medicine', 700, 'ONLINE', true),
  ('a0000006-0000-4000-8000-000000000006', 'Dr. Gef', 'Urology', 700, 'ONLINE', true),
  ('a0000007-0000-4000-8000-000000000007', 'Dr. Jane', 'Internal Medicine / Nephrology', 900, 'OFFLINE', true),
  ('a0000008-0000-4000-8000-000000000008', 'Dr. Mark Edison De Vera', 'Internal Medicine / Pulmonology', 900, 'OFFLINE', true),
  ('a0000009-0000-4000-8000-000000000009', 'Dr. Marc Anthony Donguines', 'Internal Medicine / Pulmonology', 900, 'OFFLINE', true),
  ('a0000010-0000-4000-8000-000000000010', 'Dr. Pangan', 'Psychiatry', 2700, 'OFFLINE', true),
  ('a0000011-0000-4000-8000-000000000011', 'Dr. Marjorie Anne M. Yao', 'Obstetrics and Gynecology', 700, 'OFFLINE', true),
  ('a0000012-0000-4000-8000-000000000012', 'Dr. Olivia S. Limtin', 'Obstetrics and Gynecology / Ultrasonography', 700, 'OFFLINE', true),
  ('a0000013-0000-4000-8000-000000000013', 'Dr. Dulce', 'Obstetrics and Gynecology', 700, 'OFFLINE', true),
  ('a0000014-0000-4000-8000-000000000014', 'Dr. Rocelyn Anne Recio-Aquino', 'Internal Medicine / Hematology', 1300, 'OFFLINE', true),
  ('a0000015-0000-4000-8000-000000000015', 'Dr. Maria Aloiza Hadloc-Tiu', 'Internal Medicine / Gastroenterology / Digestive Endoscopy / Liver, Pancreas, and Gallbladder Diseases', 800, 'OFFLINE', true),
  ('a0000016-0000-4000-8000-000000000016', 'Dr. Inigo Baste M. Dabu', 'General Surgery / Cancer Surgery / Laparoscopic Surgery', 600, 'OFFLINE', true),
  ('a0000017-0000-4000-8000-000000000017', 'Dr. Anya Hocso-Pantas', 'General Pediatrics', 650, 'OFFLINE', true)
on conflict (id) do update set full_name = excluded.full_name, specialty = excluded.specialty, consultation_fee = excluded.consultation_fee, availability_status = excluded.availability_status, is_active = excluded.is_active;

insert into services (id, name, description, price, duration_minutes) values
  ('11111111-1111-4111-8111-111111111111', 'General Medicine — Chat Consult', 'General medicine consultation through chat.', 250, 30),
  ('22222222-2222-4222-8222-222222222222', 'General Medicine — Chat Consult with Medical Certificate', 'Chat consultation with a medical certificate.', 300, 30),
  ('33333333-3333-4333-8333-333333333333', 'General Medicine — Video Consult', 'General medicine consultation by video.', 300, 30),
  ('44444444-4444-4444-8444-444444444444', 'General Medicine — Video Consult with Medical Certificate', 'Video consultation with a medical certificate.', 350, 30)
on conflict (id) do update set name = excluded.name, description = excluded.description, price = excluded.price, duration_minutes = excluded.duration_minutes;

alter table services enable row level security;
alter table doctors enable row level security;
alter table appointments enable row level security;
alter table medical_records enable row level security;

create policy "public can view active services" on services for select using (is_active = true);
create policy "public can view active doctors" on doctors for select using (is_active = true);

-- Additional profiles: fees have not been supplied; no bookable rates are configured.
insert into doctors (id, full_name, specialty) values
  ('a0000018-0000-4000-8000-000000000018', 'Dr. Maria Isabela Palacios-De Mesa', 'Ophthalmology'),
  ('a0000019-0000-4000-8000-000000000019', 'Dr. Maria Hilda Fe R. Hipolito', 'Urology'),
  ('a0000020-0000-4000-8000-000000000020', 'Dr. Jasper Angelo V. De Mesa', 'General Medicine / Orthopedics')
on conflict (id) do update set full_name = excluded.full_name, specialty = excluded.specialty;
