'use client';

import Link from 'next/link';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { ConditionInfo } from '@/lib/conditions';

export function ConditionCard({ condition, index }: { condition: ConditionInfo; index: number }) {
  return (
    <Dialog>
      <DialogTrigger className="group rounded-2xl border border-[#d5e1f1] bg-white p-3 text-center shadow-[0_7px_18px_rgb(8_43_111/5%)] transition hover:-translate-y-1 hover:border-[#f4b85a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f39a1e]">
        <span aria-hidden="true" className="mx-auto block aspect-square w-full max-w-[132px] bg-[url('/condition-icons.png')] bg-[length:400%_300%] bg-no-repeat transition group-hover:scale-105" style={{ backgroundPosition: ((index % 4) * 33.3333) + '% ' + (Math.floor(index / 4) * 50) + '%' }} />
        <span className="mt-2 block min-h-8 text-[10px] font-extrabold leading-4 text-[#082b6f]">{condition.title}</span>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl bg-white p-6 text-[#082b6f] shadow-2xl sm:max-w-2xl sm:p-8">
        <DialogHeader className="pr-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a9650c]">Condition guide</p>
          <DialogTitle className="text-2xl font-extrabold leading-tight">{condition.title}</DialogTitle>
          <DialogDescription className="leading-6 text-[#526582]">{condition.overview}</DialogDescription>
        </DialogHeader>
        <section className="rounded-2xl bg-[#f7fbff] p-4">
          <h3 className="font-bold">Early signs and common symptoms</h3>
          <p className="mt-2 text-xs text-[#526582]">Symptoms vary and may overlap with other conditions. Some conditions cause no early symptoms.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{condition.symptoms.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="rounded-2xl bg-[#fff8ed] p-4">
          <h3 className="font-bold">Treatment and care options</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{condition.treatment.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-900">
          <h3 className="font-bold">When to seek medical help</h3>
          <p className="mt-2 text-sm leading-6">{condition.urgent}</p>
        </section>
        <p className="text-xs leading-5 text-[#526582]">General health information, not a diagnosis or personal treatment plan. A qualified clinician can recommend care for your age, symptoms and medical history.</p>
        <Link href={`/specialists?specialty=${encodeURIComponent(condition.specialty)}`} className="rounded-full bg-[#082b6f] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#124a9a]">View relevant specialists</Link>
        <div className="border-t border-[#d5e1f1] pt-3 text-xs text-[#526582]">
          <p className="font-semibold">Learn more from the NHS</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{condition.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{source.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
