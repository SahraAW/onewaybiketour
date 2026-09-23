import Link from "next/link";
import { BookingSummary } from "@/components/BookingSummary";
import { BookingProgress } from "@/components/BookingProgress";

export function BookingLayout({ step, children }: Readonly<{ step: string; children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-5 py-2 md:px-10">
        <Link href="/tours" className="text-xs font-bold text-ink/55">Exit booking</Link>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-10 md:px-10">
        <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-10 lg:items-start">
          <section className="min-w-0">{children}</section>
          <BookingSummary />
        </div>

        <div className="mt-10">
          <BookingProgress activeStep={step} />
        </div>
      </div>
    </main>
  );
}
