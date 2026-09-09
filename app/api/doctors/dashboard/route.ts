import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!url || !anonKey || !token) return Response.json({ error: 'Doctor sign-in is required.' }, { status: 401 });
  const userClient = createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: { user }, error: authError } = await userClient.auth.getUser();
  if (authError || !user) return Response.json({ error: 'Your session has expired. Please sign in again.' }, { status: 401 });
  const admin = getSupabaseAdmin();
  const { data: doctor, error: doctorError } = await admin.from('doctors').select('id, full_name, specialty, availability_status').eq('auth_user_id', user.id).eq('is_active', true).single();
  if (doctorError || !doctor) return Response.json({ error: 'This account is not linked to an active doctor profile.' }, { status: 403 });
  const today = new Date().toISOString().slice(0, 10);
  const [appointments, records] = await Promise.all([
    admin.from('appointments').select('id, appointment_number, patient_name, patient_email, patient_mobile, appointment_date, appointment_time, notes, status, payment_status').eq('doctor_id', doctor.id).gte('appointment_date', today).order('appointment_date').order('appointment_time'),
    admin.from('medical_records').select('id, patient_name, record_type, summary, created_at').eq('doctor_id', doctor.id).order('created_at', { ascending: false }).limit(20),
  ]);
  if (appointments.error || records.error) return Response.json({ error: 'Unable to load doctor data.' }, { status: 500 });
  return Response.json({ doctor, appointments: appointments.data ?? [], records: records.data ?? [] });
}
