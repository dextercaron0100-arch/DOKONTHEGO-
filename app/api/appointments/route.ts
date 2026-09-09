import { getSupabaseAdmin } from '../../../lib/supabase-server';

type AppointmentRequest = {
  service_id: string;
  doctor_id?: string | null;
  patient_name: string;
  patient_email: string;
  patient_mobile: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AppointmentRequest>;
    const required = ['service_id', 'patient_name', 'patient_email', 'patient_mobile', 'appointment_date', 'appointment_time'] as const;
    const missing = required.filter((field) => !body[field]);
    if (missing.length) return Response.json({ error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const appointmentNumber = `DOTG-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const { data, error } = await supabase.from('appointments').insert({
      appointment_number: appointmentNumber,
      service_id: body.service_id,
      doctor_id: body.doctor_id ?? null,
      patient_name: body.patient_name,
      patient_email: body.patient_email,
      patient_mobile: body.patient_mobile,
      appointment_date: body.appointment_date,
      appointment_time: body.appointment_time,
      notes: body.notes ?? null,
      status: 'PENDING_PAYMENT',
      payment_status: 'PENDING',
    }).select('id, appointment_number, status, payment_status').single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ appointment: data }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unable to create appointment.' }, { status: 500 });
  }
}
