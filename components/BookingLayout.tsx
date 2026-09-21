import Link from "next/link";
import { BookingSummary } from "@/components/BookingSummary";
import { BookingProgress } from "@/components/BookingProgress";

export function BookingLayout({ step, children }: { step: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-paper"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10"><Link href="/tours" className="text-sm font-bold tracking-[-.04em]">One way <span className="text-orange">●</span></Link><Link href="/tours" className="text-xs font-bold text-ink/55">Exit booking</Link></header><div className="mx-auto max-w-7xl px-5 pb-16 md:px-10"><BookingProgress activeStep={step} /><div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start"><section>{children}</section><BookingSummary /></div></div></main>;
}
