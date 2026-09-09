import { getSupabaseAdmin } from '@/lib/supabase-server';

type WebhookPayload = { event?: string; data?: { payment_id?: string; reference_id?: string; payment_request_id?: string; status?: string } };

export async function POST(request: Request) {
  const expectedToken = process.env.XENDIT_WEBHOOK_TOKEN;
  const receivedToken = request.headers.get('x-callback-token');
  if (!expectedToken || receivedToken !== expectedToken) return Response.json({ error: 'Invalid webhook token.' }, { status: 401 });
  const payload = await request.json() as WebhookPayload;
  const data = payload.data;
  if (!data?.reference_id) return Response.json({ received: true });
  const paymentStatus = data.status || (payload.event === 'payment.capture' ? 'SUCCEEDED' : payload.event === 'payment.failure' ? 'FAILED' : 'PENDING');
  const update = { xendit_payment_id: data.payment_id || data.payment_request_id || null, payment_status: paymentStatus === 'SUCCEEDED' || paymentStatus === 'AUTHORIZED' ? 'PAID' : paymentStatus === 'FAILED' ? 'FAILED' : paymentStatus === 'EXPIRED' ? 'EXPIRED' : 'PENDING', ...(paymentStatus === 'SUCCEEDED' || paymentStatus === 'AUTHORIZED' ? { status: 'CONFIRMED' } : {}) };
  const { error } = await getSupabaseAdmin().from('appointments').update(update).eq('appointment_number', data.reference_id);
  if (error) { console.error('Unable to update appointment from Xendit webhook', error); return Response.json({ error: 'Webhook could not be processed.' }, { status: 500 }); }
  return Response.json({ received: true });
}
