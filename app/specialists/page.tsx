import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { doctors } from '@/lib/doctor-booking';
import { specialtyMatches } from '@/lib/specialties';

export default async function SpecialistsPage({ searchParams }: { searchParams: Promise<{ specialty?: string | string[] }> }) {
  const params = await searchParams;
  const specialty = typeof params.specialty === 'string' ? params.specialty : '';
  const matches = Object.prototype.hasOwnProperty.call(specialtyMatches, specialty) ? specialtyMatches[specialty] : [];
  const filtered = specialty ? doctors.filter((doctor) => matches.some((match) => doctor.specialty.split(' / ').includes(match))) : doctors;

  return (
    <main className="min-h-screen bg-[#f7fbff] px-5 py-8 text-[#082b6f]">
      <div className="mx-auto max-w-6xl">
        <Link href="/#specialties" className="text-sm font-bold">← Back to specialties</Link>
        <header className="mt-7 rounded-3xl bg-[#082b6f] p-7 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#f8be66]">Find your doctor</p>
          <h1 className="mt-3 text-3xl font-extrabold">{specialty || 'All doctors'}</h1>
          <p className="mt-3 text-sm text-[#c8d5ea]">{filtered.length} matching doctor{filtered.length === 1 ? '' : 's'}. Choose a doctor to view services and book an appointment.</p>
          {specialty && <Link href="/specialists" className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-[#082b6f]">Show all doctors</Link>}
        </header>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor) => (
            <article key={doctor.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#d5e1f1] bg-white shadow-[0_12px_30px_rgb(8_43_111/8%)]">
              <div className="flex items-center gap-3 border-t-4 border-[#f39a1e] bg-[#f7fbff] p-5">
                {doctor.image ? <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-2xl object-cover" /> : <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#e9f1ff] text-[#315cc9]"><UserRound size={28} /></span>}
                <div>
                  <h2 className="text-lg font-extrabold">{doctor.name}</h2>
                  <p className="text-sm">{doctor.specialty}</p>
                  <p className="mt-1 text-xs text-[#667aa0]">{doctor.online ? 'Online now' : 'Offline'}</p>
                </div>
              </div>
              {!doctor.rates.length && <p className="px-5 py-3 text-sm text-[#667aa0]">Consultation fees not yet available.</p>}
              <dl className="flex-1 divide-y divide-[#edf2f8] px-5 py-3">
                {doctor.rates.map((rate) => <div key={rate.key} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-[#667aa0]">{rate.label}</dt><dd className="text-right font-bold">{rate.display}</dd></div>)}
              </dl>
              <Link href={`/appointment?doctor=${encodeURIComponent(doctor.slug)}`} className="m-5 mt-2 rounded-full bg-[#fff4df] px-5 py-3 text-center text-sm font-bold hover:bg-[#f39a1e] hover:text-white">{doctor.rates.length ? `Book with ${doctor.name}` : `View ${doctor.name}`}</Link>
            </article>
          ))}
        </div>
        {!filtered.length && <div className="mt-7 rounded-3xl border border-dashed border-[#b8cbe1] bg-white p-8 text-center"><h2 className="text-xl font-bold">No matching doctors listed yet</h2><p className="mt-3 text-sm text-[#667aa0]">Please choose another specialty or browse all doctors.</p><Link href="/#specialties" className="mt-5 inline-block rounded-full bg-[#f39a1e] px-5 py-3 text-sm font-bold text-white">Choose another specialty</Link></div>}
      </div>
    </main>
  );
}
