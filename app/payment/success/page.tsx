import { CheckCircle2 } from 'lucide-react';

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ appointment?: string }> }) {
  const { appointment } = await searchParams;
  return <main className="grid min-h-screen place-items-center bg-[#f7fbff] px-5 text-[#082b6f]"><div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-[0_18px_50px_rgb(8_43_111/10%)]"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8f8ee] text-[#159447]"><CheckCircle2 size={34} /></span><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#f39a1e]">Payment received</p><h1 className="mt-2 text-3xl font-extrabold">Your appointment is being confirmed.</h1><p className="mt-4 text-sm leading-6 text-[#667aa0]">We received your payment. Keep this reference for your care team.</p>{appointment && <div className="my-7 rounded-2xl bg-[#e7f1fc] px-5 py-4 text-xl font-extrabold tracking-wider">{appointment}</div>}<a href="/" className="inline-flex rounded-full bg-[#f39a1e] px-6 py-3 text-sm font-bold text-white">Return home</a></div></main>;
}
