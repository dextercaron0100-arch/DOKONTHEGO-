'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { doctors, findDoctor } from '@/lib/doctor-booking';

type BookingForm = {
  rateKey: string;
  date: string;
  time: string;
  name: string;
  mobile: string;
  email: string;
  notes: string;
};

const initialForm: BookingForm = {
  rateKey: '',
  date: '',
  time: '',
  name: '',
  mobile: '',
  email: '',
  notes: '',
};

export default function AppointmentPage() {
  const [doctorSlug, setDoctorSlug] = useState(doctors[0].slug);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [step, setStep] = useState<'details' | 'review'>('details');
  const [submitted, setSubmitted] = useState<{
    appointment_number: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const doctor = findDoctor(doctorSlug) ?? doctors[0];
  const selectedRate =
    doctor.rates.find((rate) => rate.key === form.rateKey) ?? doctor.rates[0];
  const minimumDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const requestedDoctor = new URLSearchParams(window.location.search).get(
      'doctor',
    );
    if (findDoctor(requestedDoctor)) setDoctorSlug(requestedDoctor!);
  }, []);

  useEffect(() => {
    setForm((current) => ({ ...current, rateKey: doctor.rates[0]?.key ?? '' }));
  }, [doctor.slug]);

  const update = (field: keyof BookingForm, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  function review(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function confirmBooking() {
    if (!selectedRate) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: selectedRate.serviceId,
          doctor_id: doctor.id,
          selected_service_key: selectedRate.key,
          patient_name: form.name,
          patient_email: form.email,
          patient_mobile: form.mobile,
          appointment_date: form.date,
          appointment_time: form.time,
          notes: form.notes,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        appointment?: { id: string; appointment_number: string };
      };
      if (!response.ok || !result.appointment)
        throw new Error(result.error ?? 'Unable to create appointment.');

      const paymentResponse = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment_id: result.appointment.id }),
      });
      const payment = (await paymentResponse.json()) as {
        error?: string;
        payment_url?: string;
      };
      if (paymentResponse.ok && payment.payment_url) {
        window.location.assign(payment.payment_url);
        return;
      }
      setSubmitted(result.appointment);
      setError(
        payment.error ??
          'Appointment created, but payment could not be started.',
      );
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'Unable to create appointment.',
      );
    } finally {
      setLoading(false);
    }
  }

  if (!selectedRate)
    return (
      <main className="min-h-screen bg-[#f7fbff] px-5 py-12 text-[#082b6f]">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-extrabold">{doctor.name}</h1>
          <p className="mt-2 text-sm">{doctor.specialty}</p>
          <p className="mt-6 text-sm text-[#667aa0]">
            Consultation fees and booking availability have not been published
            yet.
          </p>
          <a
            href="/specialists"
            className="mt-6 inline-block rounded-full bg-[#fff4df] px-5 py-3 text-sm font-bold"
          >
            Back to doctors
          </a>
        </div>
      </main>
    );

  if (submitted)
    return (
      <main className="min-h-screen bg-[#f7fbff] px-5 py-12 text-[#082b6f]">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-[0_18px_50px_rgb(8_43_111/10%)]">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#fff4df] text-[#f39a1e]">
            <CheckCircle2 size={32} />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#f39a1e]">
            Appointment created
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">
            Your booking is pending payment.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#667aa0]">
            Your appointment with {doctor.name} is saved. It will be confirmed
            after payment is successfully verified.
          </p>
          <div className="my-7 rounded-2xl bg-[#e7f1fc] px-5 py-4 text-xl font-extrabold tracking-wider">
            {submitted.appointment_number}
          </div>
          {error && (
            <p className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </p>
          )}
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#f39a1e] px-5 py-3 text-sm font-bold text-white"
          >
            Return home <ArrowRight size={16} />
          </a>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f7fbff] px-5 py-6 text-[#082b6f] sm:py-10">
      <div className="mx-auto max-w-6xl">
        <a
          href="/#doctors"
          className="inline-flex items-center gap-2 text-sm font-bold"
        >
          <ArrowLeft size={16} /> Back to doctors
        </a>
        <div className="mt-7 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-3xl bg-[#082b6f] p-7 text-white shadow-[0_18px_50px_rgb(8_43_111/12%)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f39a1e]">
              <HeartPulse size={22} />
            </span>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[#f8be66]">
              Your selected doctor
            </p>
            <div className="mt-4 flex items-start gap-4 rounded-2xl bg-white/10 p-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-16 w-16 shrink-0 rounded-2xl border-2 border-white object-cover"
              />
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold leading-tight break-words">
                  {doctor.name}
                </h1>
                <p className="mt-2 text-sm leading-5 text-[#c8d5ea]">
                  {doctor.specialty}
                </p>
                <span
                  className={`mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${doctor.online ? 'bg-[#e8f8ee] text-[#159447]' : 'bg-white/10 text-[#d5e1f1]'}`}
                >
                  {doctor.online ? 'Online now' : 'Scheduled availability'}
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-[#c8d5ea]">
              Choose a service and preferred schedule. You can review every
              detail before continuing to payment.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[#d5e1f1]">
              <p className="flex gap-3">
                <ShieldCheck size={18} className="shrink-0 text-[#f8be66]" />{' '}
                Secure patient information
              </p>
              <p className="flex gap-3">
                <Clock3 size={18} className="shrink-0 text-[#f8be66]" />{' '}
                Schedule subject to doctor confirmation
              </p>
              <p className="flex gap-3">
                <CalendarDays size={18} className="shrink-0 text-[#f8be66]" />{' '}
                Confirmed after payment verification
              </p>
            </div>
          </aside>
          {step === 'details' ? (
            <form
              onSubmit={review}
              className="min-w-0 rounded-3xl bg-white p-6 shadow-[0_18px_50px_rgb(8_43_111/8%)] sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f39a1e]">
                Step 1 of 2
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Choose your appointment.
              </h2>
              <div className="mt-7 grid min-w-0 gap-5">
                <label className="grid min-w-0 gap-2 text-sm font-bold">
                  Doctor
                  <select
                    value={doctor.slug}
                    onChange={(event) => setDoctorSlug(event.target.value)}
                    className="w-full min-w-0 rounded-xl border border-[#d5e1f1] bg-[#f7fbff] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                  >
                    {doctors.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.name} · {item.specialty}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid min-w-0 gap-2 text-sm font-bold">
                  Service
                  <select
                    value={selectedRate.key}
                    onChange={(event) => update('rateKey', event.target.value)}
                    className="w-full min-w-0 rounded-xl border border-[#d5e1f1] bg-[#f7fbff] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                  >
                    {doctor.rates.map((rate) => (
                      <option key={rate.key} value={rate.key}>
                        {rate.label} · {rate.display}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-bold">
                    Preferred date
                    <input
                      value={form.date}
                      onChange={(event) => update('date', event.target.value)}
                      min={minimumDate}
                      type="date"
                      required
                      className="w-full min-w-0 rounded-xl border border-[#d5e1f1] bg-[#f7fbff] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-bold">
                    Preferred time
                    <input
                      value={form.time}
                      onChange={(event) => update('time', event.target.value)}
                      type="time"
                      required
                      className="w-full min-w-0 rounded-xl border border-[#d5e1f1] bg-[#f7fbff] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                    />
                  </label>
                </div>
                <div className="min-w-0 border-t border-[#d5e1f1] pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667aa0]">
                    Patient details
                  </p>
                  <div className="mt-4 grid min-w-0 gap-5 sm:grid-cols-2">
                    <label className="grid min-w-0 gap-2 text-sm font-bold">
                      Full name
                      <input
                        value={form.name}
                        onChange={(event) => update('name', event.target.value)}
                        required
                        placeholder="Juan Dela Cruz"
                        className="w-full min-w-0 rounded-xl border border-[#d5e1f1] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                      />
                    </label>
                    <label className="grid min-w-0 gap-2 text-sm font-bold">
                      Mobile number
                      <input
                        value={form.mobile}
                        onChange={(event) =>
                          update('mobile', event.target.value)
                        }
                        required
                        placeholder="09XX XXX XXXX"
                        className="w-full min-w-0 rounded-xl border border-[#d5e1f1] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                      />
                    </label>
                    <label className="grid min-w-0 gap-2 text-sm font-bold sm:col-span-2">
                      Email address
                      <input
                        value={form.email}
                        onChange={(event) =>
                          update('email', event.target.value)
                        }
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full min-w-0 rounded-xl border border-[#d5e1f1] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                      />
                    </label>
                    <label className="grid min-w-0 gap-2 text-sm font-bold sm:col-span-2">
                      Notes or reason for consultation
                      <textarea
                        value={form.notes}
                        onChange={(event) =>
                          update('notes', event.target.value)
                        }
                        rows={3}
                        placeholder="Anything your doctor should know?"
                        className="w-full min-w-0 rounded-xl border border-[#d5e1f1] px-4 py-3 font-normal outline-none focus:border-[#f39a1e]"
                      />
                    </label>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a1e] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgb(243_154_30/22%)]">
                  Continue to review <ArrowRight size={16} />
                </button>
                <p className="text-xs leading-5 text-[#8698b2]">
                  No appointment is created until you confirm the review screen.
                </p>
              </div>
            </form>
          ) : (
            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_rgb(8_43_111/8%)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f39a1e]">
                Step 2 of 2
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Review your booking.
              </h2>
              <div className="mt-7 divide-y divide-[#d5e1f1] rounded-2xl border border-[#d5e1f1] px-5">
                <ReviewRow
                  label="Doctor"
                  value={`${doctor.name} · ${doctor.specialty}`}
                />
                <ReviewRow label="Service" value={selectedRate.label} />
                <ReviewRow
                  label="Price"
                  value={`₱${selectedRate.price.toLocaleString('en-PH')}`}
                />
                <ReviewRow
                  label="Schedule"
                  value={`${formatDate(form.date)} · ${formatTime(form.time)}`}
                />
                <ReviewRow label="Patient" value={form.name} />
                <ReviewRow
                  label="Contact"
                  value={`${form.mobile} · ${form.email}`}
                />
                {form.notes && <ReviewRow label="Notes" value={form.notes} />}
              </div>
              {error && (
                <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  disabled={loading}
                  className="rounded-full border border-[#d5e1f1] px-6 py-3.5 text-sm font-bold"
                >
                  Edit details
                </button>
                <button
                  type="button"
                  onClick={confirmBooking}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f39a1e] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgb(243_154_30/22%)] disabled:cursor-wait disabled:opacity-60"
                >
                  {loading
                    ? 'Creating appointment…'
                    : 'Confirm and continue to payment'}{' '}
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="mt-5 text-xs leading-5 text-[#8698b2]">
                Your appointment is confirmed only after successful payment
                verification.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr]">
      <span className="text-xs font-bold uppercase tracking-wide text-[#8698b2]">
        {label}
      </span>
      <span className="text-sm font-semibold text-[#082b6f] sm:text-right">
        {value}
      </span>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function formatTime(value: string) {
  if (!value) return '';
  const [hour, minute] = value.split(':').map(Number);
  return new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(2026, 0, 1, hour, minute));
}
