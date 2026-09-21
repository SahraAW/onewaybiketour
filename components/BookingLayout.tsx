import Link from "next/link";
import { BookingSummary } from "@/components/BookingSummary";

const steps = ["date", "bike", "size", "extras", "summary"];

export function BookingLayout({ step, children }: { step: string; children: React.ReactNode }) {
  const active = steps.indexOf(step);
  return <main className="min-h-screen bg-paper"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10"><Link href="/tours" className="text-sm font-bold tracking-[-.04em]">One way <span className="text-orange">●</span></Link><Link href="/tours" className="text-xs font-bold text-ink/55">Exit booking</Link></header><div className="mx-auto max-w-7xl px-5 pb-16 md:px-10"><div className="mb-10 flex items-center gap-2 overflow-x-auto border-y border-ink/15 py-4">{steps.map((item, index) => <div key={item} className={`flex items-center gap-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[.12em] ${index <= active ? "text-orange" : "text-ink/35"}`}><span className="grid h-6 w-6 place-items-center rounded-full border border-current">{index + 1}</span>{item}{index < steps.length - 1 && <span className="ml-1 text-ink/20">/</span>}</div>)}</div><div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start"><section>{children}</section><BookingSummary /></div></div></main>;
}
