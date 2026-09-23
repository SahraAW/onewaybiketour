import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BookingSummary } from "@/components/BookingSummary";
import { BookingProgress } from "@/components/BookingProgress";

export function BookingLayout({ step, children }: Readonly<{ step: string; children: React.ReactNode }>) {
  return <main className="min-h-screen bg-paper"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10"><Logo /><Link href="/tours" className="text-xs font-bold text-ink/55">Exit booking</Link></header><div className="mx-auto max-w-7xl px-5 pb-10 md:px-10"><div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:items-start"><section className="min-w-0">{children}</section><BookingSummary /></div><BookingProgress activeStep={step} /></div></main>;
}
