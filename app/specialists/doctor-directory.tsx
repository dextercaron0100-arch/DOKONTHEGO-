'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X, UserRound } from 'lucide-react';
import type { doctors } from '@/lib/doctor-booking';

type Doctor = (typeof doctors)[number];

export default function DoctorDirectory({ doctors: listedDoctors }: { doctors: Doctor[] }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (!selectedDoctor) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedDoctor(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selectedDoctor]);

  return (
    <>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {listedDoctors.map((doctor) => (
          <article key={doctor.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#d5e1f1] bg-white shadow-[0_12px_30px_rgb(8_43_111/8%)]">
            <div className="flex items-center gap-3 border-t-4 border-[#f39a1e] bg-[#f7fbff] p-5">
              {doctor.image ? <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-2xl object-cover" /> : <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#e9f1ff] text-[#315cc9]"><UserRound size={28} /></span>}
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold leading-tight">{doctor.name}</h2>
                <p className="mt-1 text-sm">{doctor.specialty}</p>
                <p className="mt-1 text-xs text-[#667aa0]">{doctor.online ? 'Online now' : 'Offline'}</p>
              </div>
            </div>
            {!doctor.rates.length && <p className="px-5 py-3 text-sm text-[#667aa0]">Consultation fees not yet available.</p>}
            <dl className="flex-1 divide-y divide-[#edf2f8] px-5 py-3">
              {doctor.rates.map((rate) => <div key={rate.key} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-[#667aa0]">{rate.label}</dt><dd className="text-right font-bold">{rate.display}</dd></div>)}
            </dl>
            <button type="button" onClick={() => setSelectedDoctor(doctor)} className="m-5 mt-2 rounded-full bg-[#fff4df] px-5 py-3 text-center text-sm font-bold hover:bg-[#f39a1e] hover:text-white">
              {doctor.rates.length ? `Book with ${doctor.name}` : `View ${doctor.name}`}
            </button>
          </article>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#082b6f]/55 px-5 py-8" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedDoctor(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="doctor-modal-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-[#082b6f] shadow-[0_24px_80px_rgb(8_43_111/25%)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                {selectedDoctor.image ? <img src={selectedDoctor.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover" /> : <span aria-hidden="true" className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[#e9f1ff] text-[#315cc9]"><UserRound size={32} /></span>}
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f39a1e]">Selected doctor</p>
                  <h2 id="doctor-modal-title" className="mt-1 text-2xl font-extrabold leading-tight">{selectedDoctor.name}</h2>
                  <p className="mt-1 text-sm text-[#667aa0]">{selectedDoctor.specialty}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedDoctor(null)} aria-label="Close doctor details" className="rounded-full p-2 text-[#667aa0] hover:bg-[#f7fbff] hover:text-[#082b6f]"><X size={20} /></button>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f7fbff] px-4 py-3 text-sm">
              <span className="text-[#667aa0]">Availability</span>
              <span className={`font-bold ${selectedDoctor.online ? 'text-[#159447]' : 'text-[#667aa0]'}`}>{selectedDoctor.online ? 'Online now' : 'Scheduled availability'}</span>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-extrabold">Available services</h3>
              {selectedDoctor.rates.length ? <dl className="mt-3 divide-y divide-[#edf2f8] rounded-2xl border border-[#d5e1f1] px-4">{selectedDoctor.rates.map((rate) => <div key={rate.key} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-[#667aa0]">{rate.label}</dt><dd className="font-bold">{rate.display}</dd></div>)}</dl> : <p className="mt-3 rounded-2xl bg-[#f7fbff] px-4 py-3 text-sm text-[#667aa0]">Consultation fees are not available yet.</p>}
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setSelectedDoctor(null)} className="rounded-full border border-[#d5e1f1] px-5 py-3 text-sm font-bold">Close</button>
              <Link href={`/appointment?doctor=${encodeURIComponent(selectedDoctor.slug)}`} onClick={() => setSelectedDoctor(null)} className="rounded-full bg-[#f39a1e] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#082b6f]">Continue booking</Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
