export type DoctorRate = {
  key: string;
  label: string;
  price: number;
  display: string;
  serviceId: string;
};

export type BookingDoctor = {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  online: boolean;
  image: string;
  rates: DoctorRate[];
};

const CONSULTATION_ID = '11111111-1111-4111-8111-111111111111';
const CERTIFICATE_ID = '22222222-2222-4222-8222-222222222222';
const rate = (key: string, label: string, price: number, display = `₱${price.toLocaleString('en-PH')}`): DoctorRate => ({
  key,
  label,
  price,
  display,
  serviceId: label.toLowerCase().includes('certificate') || label.toLowerCase().includes('cert') ? CERTIFICATE_ID : CONSULTATION_ID,
});

export const doctors: BookingDoctor[] = [
  { id: 'a0000001-0000-4000-8000-000000000001', slug: 'dr-nina', name: 'Dr. Maria Jenina Aguado-De Chavez', specialty: 'Dermatology', online: true, image: '/doctors/aguado-de-chavez.png', rates: [rate('certificate', 'With Certificate', 1100), rate('consultation', 'Consultation', 800)] },
  { id: 'a0000002-0000-4000-8000-000000000002', slug: 'dr-mariel', name: 'Dr. Mariel C. Enverga', specialty: 'Internal Medicine / Endocrinology / Diabetes and Metabolism', online: true, image: '/doctors/mariel-enverga.png', rates: [rate('certificate', 'With Certificate', 1150), rate('consultation', 'Consultation', 950), rate('follow-up', 'Follow-up', 950, 'Same as New')] },
  { id: 'a0000003-0000-4000-8000-000000000003', slug: 'dr-evaliza', name: 'Dr. Evaliza Therese D. Villoria', specialty: 'Neurology', online: true, image: '/doctors/villoria.png', rates: [rate('certificate', 'With Certificate', 1400), rate('consultation', 'Consultation', 950), rate('follow-up', 'Follow-up', 700), rate('refill', 'Refill', 350)] },
  { id: 'a0000004-0000-4000-8000-000000000004', slug: 'dr-ambal', name: 'Dr. Rossel Anjelo A. Ambal', specialty: 'Internal Medicine / Adult Cardiology', online: true, image: '/doctors/ambal.png', rates: [rate('certificate', 'With Certificate', 1250), rate('consultation', 'Consultation', 900), rate('internal-medicine', 'Internal Medicine', 900, '₱900 / ₱700'), rate('surgery', 'Surgery', 2500), rate('follow-up', 'Follow-up', 600)] },
  { id: 'a0000005-0000-4000-8000-000000000005', slug: 'dr-hans', name: 'Dr. Hans', specialty: 'Internal Medicine', online: true, image: '/doctors/johan-ashser-demesa.png', rates: [rate('certificate', 'With Certificate', 900), rate('consultation', 'Consultation', 700), rate('surgery', 'Surgery', 1500)] },
  { id: 'a0000006-0000-4000-8000-000000000006', slug: 'dr-gef', name: 'Dr. Gef', specialty: 'Urology', online: true, image: '/doctors/urology.jpg', rates: [rate('certificate', 'With Certificate', 850), rate('consultation', 'Consultation', 700), rate('follow-up', 'Follow-up', 400)] },
  { id: 'a0000007-0000-4000-8000-000000000007', slug: 'dr-jane', name: 'Dr. Jane', specialty: 'Internal Medicine / Nephrology', online: false, image: '/doctors/portrait-16.png', rates: [rate('certificate', 'With Certificate', 1300), rate('consultation', 'Consultation', 900), rate('nephrology-follow-up', 'Nephrology Follow-up', 500), rate('senior-nephrology', 'Senior/PWD Nephrology', 500), rate('senior-internal-medicine', 'Senior/PWD Internal Medicine', 400), rate('ct-scan', 'CT Scan', 1500)] },
  { id: 'a0000008-0000-4000-8000-000000000008', slug: 'dr-edison', name: 'Dr. Mark Edison De Vera', specialty: 'Internal Medicine / Pulmonology', online: false, image: '/doctors/mark-edison-de-vera.png', rates: [rate('certificate', 'With Certificate', 1200), rate('consultation', 'Consultation', 900), rate('follow-up', 'Follow-up', 500), rate('cp-clearance', 'Cardiopulmonary Clearance', 2000)] },
  { id: 'a0000009-0000-4000-8000-000000000009', slug: 'dr-marc', name: 'Dr. Marc Anthony Donguines', specialty: 'Internal Medicine / Pulmonology', online: false, image: '/doctors/portrait-7.png', rates: [rate('certificate', 'With Certificate', 1200), rate('consultation', 'Consultation', 900), rate('follow-up', 'Follow-up', 500), rate('cp-clearance', 'Cardiopulmonary Clearance', 2000)] },
  { id: 'a0000010-0000-4000-8000-000000000010', slug: 'dr-pangan', name: 'Dr. Romano Pangan', specialty: 'Psychiatry', online: false, image: '/doctors/romano-pangan.png', rates: [rate('certificate', 'With Certificate', 3000), rate('consultation', 'Consultation', 2700), rate('follow-up', 'Follow-up', 2100), rate('esa', 'Emotional Support Animal Letter', 3300), rate('senior', 'Senior/PWD Consultation', 2300), rate('senior-certificate', 'Senior/PWD with Certificate', 2500)] },
  { id: 'a0000011-0000-4000-8000-000000000011', slug: 'dr-marj', name: 'Dr. Marjorie Anne M. Yao', specialty: 'Obstetrics and Gynecology', online: false, image: '/doctors/obgyn.jpg', rates: [rate('certificate', 'With Certificate', 1000), rate('consultation', 'Consultation / Follow-up', 700), rate('senior', 'PWD / Senior', 600)] },
  { id: 'a0000012-0000-4000-8000-000000000012', slug: 'dr-olivia', name: 'Dr. Olivia S. Limtin', specialty: 'Obstetrics and Gynecology / Ultrasonography', online: false, image: '/doctors/olivia.png', rates: [rate('certificate', 'With Certificate', 900), rate('consultation', 'Consultation', 700), rate('follow-up', 'Follow-up', 600), rate('senior', 'PWD / Senior', 600)] },
  { id: 'a0000013-0000-4000-8000-000000000013', slug: 'dr-dulce', name: 'Dr. Dulce', specialty: 'Obstetrics and Gynecology', online: false, image: '/doctors/portrait-13.png', rates: [rate('certificate', 'Consultation with Certificate', 700), rate('follow-up', 'Follow-up', 600), rate('senior', 'PWD / Senior', 600)] },
  { id: 'a0000014-0000-4000-8000-000000000014', slug: 'dr-recio', name: 'Dr. Rocelyn Anne Recio-Aquino', specialty: 'Internal Medicine / Hematology', online: false, image: '/doctors/recio-aquino.png', rates: [rate('certificate', 'With Certificate', 1650), rate('consultation', 'Consultation', 1300), rate('follow-up', 'Follow-up', 650), rate('follow-up-certificate', 'Follow-up with Certificate', 800)] },
  { id: 'a0000015-0000-4000-8000-000000000015', slug: 'dr-tiu', name: 'Dr. Maria Aloiza Hadloc-Tiu', specialty: 'Internal Medicine / Gastroenterology / Digestive Endoscopy / Liver, Pancreas, and Gallbladder Diseases', online: false, image: '/doctors/maria-aloiza.png', rates: [rate('certificate', 'With Certificate', 950), rate('consultation', 'Consultation', 800), rate('follow-up', 'Follow-up', 500), rate('internal-medicine', 'Internal Medicine', 900, '₱900 / ₱700')] },
  { id: 'a0000016-0000-4000-8000-000000000016', slug: 'dr-inigo', name: 'Dr. Inigo Baste M. Dabu', specialty: 'General Surgery / Cancer Surgery / Laparoscopic Surgery', online: false, image: '/doctors/inigo-baste.png', rates: [rate('certificate', 'With Certificate', 750), rate('consultation', 'Consultation', 600), rate('follow-up', 'Follow-up', 600, 'Same as New')] },
  { id: 'a0000017-0000-4000-8000-000000000017', slug: 'dr-anya', name: 'Dr. Anya Hocson-Pantas', specialty: 'General Pediatrics', online: false, image: '/doctors/hocson-pantas.png', rates: [rate('certificate', 'With Certificate', 750), rate('consultation', 'Consultation', 650)] },
  { id: 'a0000018-0000-4000-8000-000000000018', slug: 'dr-maria-isabela-palacios-de-mesa', name: 'Dr. Maria Isabela Palacios-De Mesa', specialty: 'Ophthalmology', online: false, image: '/doctors/maria-isabela-palacios.png', rates: [] },
  { id: 'a0000019-0000-4000-8000-000000000019', slug: 'dr-maria-hilda-fe-hipolito', name: 'Dr. Maria Hilda Fe R. Hipolito', specialty: 'Urology', online: false, image: '/doctors/hipolito.png', rates: [] },
  { id: 'a0000020-0000-4000-8000-000000000020', slug: 'dr-jasper-angelo-de-mesa', name: 'Dr. Jasper Angelo V. De Mesa', specialty: 'General Medicine / Orthopedics', online: false, image: '/doctors/jasper-angelo.png', rates: [] },
];

export function findDoctor(slug?: string | null) {
  return doctors.find((doctor) => doctor.slug === slug);
}

export function findDoctorRate(doctorId?: string | null, rateKey?: string | null) {
  const doctor = doctors.find((item) => item.id === doctorId);
  const selectedRate = doctor?.rates.find((item) => item.key === rateKey);
  return doctor && selectedRate ? { doctor, rate: selectedRate } : null;
}
