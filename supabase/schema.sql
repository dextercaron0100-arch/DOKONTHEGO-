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
  full_name text not null,
  specialty text not null,
  bio text,
  consultation_fee numeric(10,2) not null default 0,
  availability_status text not null default 'OFFLINE' check (availability_status in ('ONLINE', 'SCHEDULED', 'OFFLINE')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  appointment_number text not null unique,
  service_id uuid not null references services(id),
  doctor_id uuid references doctors(id),
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

create index if not exists appointments_schedule_idx on appointments (appointment_date, appointment_time);
create index if not exists appointments_status_idx on appointments (status, payment_status);

alter table appointments add column if not exists xendit_session_id text;
alter table appointments add column if not exists payment_url text;

insert into services (id, name, description, price, duration_minutes) values
  ('11111111-1111-4111-8111-111111111111', 'Online Medical Consultation', 'Talk to a doctor from home.', 500, 30),
  ('22222222-2222-4222-8222-222222222222', 'Medical Certificate', 'School, work, or travel certificate.', 350, 20),
  ('33333333-3333-4333-8333-333333333333', 'Fit-to-Work / Health Clearance', 'Get cleared and stay work-ready.', 500, 30),
  ('44444444-4444-4444-8444-444444444444', 'Home Service / On-The-Go Checkup', 'Care in the comfort of your home.', 0, 60)
on conflict (id) do nothing;

alter table services enable row level security;
alter table doctors enable row level security;
alter table appointments enable row level security;

create policy "public can view active services" on services for select using (is_active = true);
create policy "public can view active doctors" on doctors for select using (is_active = true);
