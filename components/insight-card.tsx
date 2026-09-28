'use client';

import type { ReactNode } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const guides = [
  {
    intro: 'Small, repeatable choices can support your health over time. Start with one habit and build from there.',
    tips: [
      ['Move regularly', 'Build toward at least 150 minutes of moderate activity each week, such as brisk walking. Start gradually and choose activities that suit your abilities.'],
      ['Eat a varied diet', 'Include vegetables, fruit, whole grains and protein foods. Choose water more often than sugary drinks and limit foods high in salt.'],
      ['Make sleep a routine', 'Keep a consistent bedtime and wake-up time, including weekends. Allow enough time for restful sleep.'],
      ['Break up sitting', 'Take short movement breaks during desk work or long periods of sitting. Even small amounts of activity count.'],
      ['Make changes manageable', 'Choose one realistic goal, such as a daily walk or adding vegetables to lunch, and build consistency before adding another.'],
    ],
    sources: [['WHO: Physical activity', 'https://www.who.int/health-topics/noncommunicable-diseases/physical-activity'], ['WHO: Healthy diet', 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet']],
  },
  {
    intro: 'A varied diet supports normal immune function. No single food or supplement can guarantee protection from infections.',
    tips: [
      ['Choose variety', 'Different foods provide different nutrients. Combine vegetables, fruit, grains and protein foods rather than relying on one “superfood.”'],
      ['Include everyday protein foods', 'Fish, eggs, beans, tofu and other protein sources can be part of a balanced diet. Choose options that fit your preferences and health needs.'],
      ['Food first', 'Adequate vitamins and minerals help the immune system work properly. A clinician can assess whether you have a deficiency that needs treatment.'],
      ['Be cautious with supplements', 'Taking extra vitamins generally does not prevent infections when you already get enough. Supplements can interact with medicines; discuss them with your doctor or pharmacist.'],
    ],
    sources: [['NIH: Nutrition and immune function', 'https://ods.od.nih.gov/factsheets/ImmuneFunction-Consumer/'], ['WHO: Healthy diet', 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet']],
  },
  {
    intro: 'Blood pressure measures the force of blood against artery walls. Knowing your readings helps you and your clinician track heart health.',
    tips: [
      ['Understand the two numbers', 'Systolic pressure, the top number, measures pressure when the heart beats. Diastolic pressure, the bottom number, measures pressure between beats. Readings are measured in mm Hg.'],
      ['Measure carefully', 'Use an appropriately sized upper-arm cuff. Rest quietly before measuring and sit with your back supported, feet flat and arm supported at heart level. Follow the device instructions.'],
      ['Look at the pattern', 'One reading does not usually establish a diagnosis. Record your readings and share them with a clinician, who can interpret them alongside your medical history.'],
      ['Discuss next steps', 'Regular activity and a healthy eating pattern can support blood pressure control. If medicine is prescribed, take it as directed and discuss changes with your clinician.'],
    ],
    sources: [['NHLBI: Blood pressure and diagnosis', 'https://www.nhlbi.nih.gov/health/high-blood-pressure/diagnosis']],
  },
  {
    intro: 'Good sleep supports physical health, attention and daily functioning. Both sleep quality and a regular routine matter.',
    tips: [
      ['Keep a steady schedule', 'Go to bed and wake up at similar times each day. Give yourself enough time to sleep rather than relying on catching up later.'],
      ['Create a calm bedtime routine', 'Use the hour before bed to wind down. Keep your bedroom quiet, cool and dark, and reduce bright screens before sleep.'],
      ['Watch evening habits', 'Avoid caffeine late in the day and heavy meals close to bedtime. Alcohol can disrupt sleep even if it initially makes you feel sleepy.'],
      ['Get help for persistent problems', 'Talk with a clinician if trouble sleeping or daytime sleepiness continues. Loud snoring or waking up gasping also deserves assessment.'],
    ],
    sources: [['NHLBI: Good-quality sleep', 'https://www.nhlbi.nih.gov/health/heart-healthy-living/sleep'], ['NHLBI: Healthy sleep habits', 'https://www.nhlbi.nih.gov/health/insomnia/treatment']],
  },
];

export function InsightCard({ title, index, children }: { title: string; index: number; children: ReactNode }) {
  const guide = guides[index];
  return (
    <Dialog>
      <article className="relative overflow-hidden rounded-2xl border border-[#d5e1f1] bg-white transition hover:border-[#f39a1e] hover:shadow-lg focus-within:ring-2 focus-within:ring-[#f39a1e]">
        {children}
        <span className="block px-4 pb-4 text-xs font-bold text-[#082b6f]">Read article →</span>
        <DialogTrigger aria-label={`Read ${title}`} className="absolute inset-0 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#f39a1e]" />
      </article>
      <DialogContent className="max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl bg-white p-6 text-[#082b6f] sm:max-w-2xl sm:p-8">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-2xl font-extrabold leading-tight">{title}</DialogTitle>
          <DialogDescription className="leading-6 text-[#526582]">{guide.intro}</DialogDescription>
        </DialogHeader>
        {guide.tips.map(([heading, text]) => <section key={heading}><h3 className="font-bold">{heading}</h3><p className="mt-2 text-sm leading-6 text-[#526582]">{text}</p></section>)}
        <p className="rounded-xl bg-[#f7fbff] p-4 text-xs leading-5 text-[#526582]">General health education. For advice suited to your symptoms and medical history, consult a qualified clinician.</p>
        <div className="border-t border-[#d5e1f1] pt-4"><h3 className="text-sm font-bold">Sources and further reading</h3><ul className="mt-2 space-y-2">{guide.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-2">{label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></div>
      </DialogContent>
    </Dialog>
  );
}
