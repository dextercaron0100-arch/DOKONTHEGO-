import Link from 'next/link';
import { doctors } from '@/lib/doctor-booking';
import { specialtyMatches } from '@/lib/specialties';
import DoctorDirectory from './doctor-directory';

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
        <DoctorDirectory doctors={filtered} />
        {!filtered.length && <div className="mt-7 rounded-3xl border border-dashed border-[#b8cbe1] bg-white p-8 text-center"><h2 className="text-xl font-bold">No matching doctors listed yet</h2><p className="mt-3 text-sm text-[#667aa0]">Please choose another specialty or browse all doctors.</p><Link href="/#specialties" className="mt-5 inline-block rounded-full bg-[#f39a1e] px-5 py-3 text-sm font-bold text-white">Choose another specialty</Link></div>}
      </div>
    </main>
  );
}
