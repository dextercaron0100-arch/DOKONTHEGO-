-- Correct supplied profiles without changing IDs, fees, availability, or account links.
begin;
update doctors set full_name = 'Dr. Maria Jenina Aguado-De Chavez', specialty = 'Dermatology' where id = 'a0000001-0000-4000-8000-000000000001';
update doctors set full_name = 'Dr. Mariel C. Enverga', specialty = 'Internal Medicine / Endocrinology / Diabetes and Metabolism' where id = 'a0000002-0000-4000-8000-000000000002';
update doctors set full_name = 'Dr. Evaliza Therese D. Villoria', specialty = 'Neurology' where id = 'a0000003-0000-4000-8000-000000000003';
update doctors set full_name = 'Dr. Rossel Anjelo A. Ambal', specialty = 'Internal Medicine / Adult Cardiology' where id = 'a0000004-0000-4000-8000-000000000004';
update doctors set full_name = 'Dr. Mark Edison De Vera', specialty = 'Internal Medicine / Pulmonology' where id = 'a0000008-0000-4000-8000-000000000008';
update doctors set full_name = 'Dr. Marc Anthony Donguines', specialty = 'Internal Medicine / Pulmonology' where id = 'a0000009-0000-4000-8000-000000000009';
update doctors set full_name = 'Dr. Marjorie Anne M. Yao', specialty = 'Obstetrics and Gynecology' where id = 'a0000011-0000-4000-8000-000000000011';
update doctors set full_name = 'Dr. Olivia S. Limtin', specialty = 'Obstetrics and Gynecology / Ultrasonography' where id = 'a0000012-0000-4000-8000-000000000012';
update doctors set full_name = 'Dr. Rocelyn Anne Recio-Aquino', specialty = 'Internal Medicine / Hematology' where id = 'a0000014-0000-4000-8000-000000000014';
update doctors set full_name = 'Dr. Maria Aloiza Hadloc-Tiu', specialty = 'Internal Medicine / Gastroenterology / Digestive Endoscopy / Liver, Pancreas, and Gallbladder Diseases' where id = 'a0000015-0000-4000-8000-000000000015';
update doctors set full_name = 'Dr. Inigo Baste M. Dabu', specialty = 'General Surgery / Cancer Surgery / Laparoscopic Surgery' where id = 'a0000016-0000-4000-8000-000000000016';
update doctors set full_name = 'Dr. Anya Hocso-Pantas', specialty = 'General Pediatrics' where id = 'a0000017-0000-4000-8000-000000000017';

-- Newly supplied profiles have no bookable services until their rates are provided.
insert into doctors (id, full_name, specialty) values
  ('a0000018-0000-4000-8000-000000000018', 'Dr. Maria Isabela Palacios-De Mesa', 'Ophthalmology'),
  ('a0000019-0000-4000-8000-000000000019', 'Dr. Maria Hilda Fe R. Hipolito', 'Urology'),
  ('a0000020-0000-4000-8000-000000000020', 'Dr. Jasper Angelo V. De Mesa', 'General Medicine / Orthopedics')
on conflict (id) do update set full_name = excluded.full_name, specialty = excluded.specialty;
commit;

