import { getSupabaseAdmin } from '@/lib/supabase-server';
import { allowRequest, getClientKey, tooLarge } from '@/lib/rate-limit';

type Appointment = { id: string; appointment_number: string; patient_name: string; patient_email: string; patient_mobile: string; service_id: string; selected_service_name: string | null; selected_service_price: number | string | null; services: { name: string; price: number | string } | null };
const cleanReference = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 64) || 'customer';
const splitName = (value: string) => { const parts = value.trim().split(/\s+/); return { given_names: parts.shift() || 'Patient', surname: parts.join(' ') || 'Patient' }; };
const normalizeMobile = (value: string) => { const digits = value.replace(/\D/g, ''); return digits.startsWith('63') ? `+${digits}` : digits.startsWith('0') ? `+63${digits.slice(1)}` : `+${digits}`; };

export async function POST(request: Request) {
  if (tooLarge(request, 8_000)) return Response.json({ error: 'Request is too large.' }, { status: 413 });
  const rate = allowRequest(`payment:${getClientKey(request)}`, 20);
  if (!rate.allowed) return Response.json({ error: 'Too many payment attempts. Please try again shortly.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const secret = process.env.XENDIT_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!secret || !appUrl) return Response.json({ error: 'Payment settings are not configured yet.' }, { status: 503 });
  const body = await request.json() as { appointment_id?: string };
  if (!body.appointment_id) return Response.json({ error: 'appointment_id is required.' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data: appointment, error: appointmentError } = await supabase.from('appointments').select('id, appointment_number, patient_name, patient_email, patient_mobile, service_id, selected_service_name, selected_service_price, services(name, price)').eq('id', body.appointment_id).single() as { data: Appointment | null; error: { message: string } | null };
  if (appointmentError || !appointment) return Response.json({ error: 'Appointment not found.' }, { status: 404 });
  const service = appointment.services;
  const amount = Number(appointment.selected_service_price ?? service?.price ?? 0);
  const serviceName = appointment.selected_service_name || service?.name || 'Medical service';
  if (!Number.isFinite(amount) || amount <= 0) return Response.json({ error: 'This service requires a quote before payment.' }, { status: 422 });
  const { given_names, surname } = splitName(appointment.patient_name);
  const payload = {
    reference_id: appointment.appointment_number, session_type: 'PAY', mode: 'PAYMENT_LINK', amount, currency: 'PHP', country: 'PH', locale: 'en', capture_method: 'AUTOMATIC',
    customer: { reference_id: cleanReference(appointment.appointment_number), type: 'INDIVIDUAL', email: appointment.patient_email, mobile_number: normalizeMobile(appointment.patient_mobile), individual_detail: { given_names, surname } },
    items: [{ reference_id: cleanReference(appointment.service_id), name: serviceName, type: 'PHYSICAL_SERVICE', category: 'HEALTHCARE', net_unit_amount: amount, quantity: 1, description: `Doktor On The Go appointment ${appointment.appointment_number}` }],
    description: `Doktor On The Go appointment ${appointment.appointment_number}`,
    metadata: { appointment_id: appointment.id, appointment_number: appointment.appointment_number },
    success_return_url: `${appUrl}/payment/success?appointment=${encodeURIComponent(appointment.appointment_number)}`,
    cancel_return_url: `${appUrl}/payment/failed?appointment=${encodeURIComponent(appointment.appointment_number)}`,
  };
  const xenditResponse = await fetch('https://api.xendit.co/sessions', { method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${secret}:`).toString('base64')}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await xenditResponse.json() as { payment_session_id?: string; payment_link_url?: string; [key: string]: unknown };
  if (!xenditResponse.ok || !result.payment_session_id || !result.payment_link_url) { console.error('Xendit session creation failed', result); return Response.json({ error: 'Unable to start payment. Please try again.' }, { status: 502 }); }
  const { error: updateError } = await supabase.from('appointments').update({ xendit_session_id: result.payment_session_id, payment_url: result.payment_link_url }).eq('id', appointment.id);
  if (updateError) return Response.json({ error: 'Payment started but appointment could not be updated.' }, { status: 500 });
  return Response.json({ payment_url: result.payment_link_url, payment_session_id: result.payment_session_id });
}
