"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { extras } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function BookingExtrasPage() {
  const { booking, updateBooking } = useBooking();
  const toggle = (id: string) => updateBooking({ extraIds: booking.extraIds.includes(id) ? booking.extraIds.filter((item) => item !== id) : [...booking.extraIds, id] });
  const insurance = extras.filter((extra) => extra.id === "insurance");
  return <BookingLayout step="insurance"><p className="eyebrow text-orange">Step 03 / Insurance</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Protect your<br /><span className="text-orange">ride.</span></h1><p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">Choose optional ride protection for peace of mind while you explore.</p><div className="mt-10 space-y-3">{insurance.map((extra) => <BookingOption key={extra.id} selected={booking.extraIds.includes(extra.id)} title="Ride protection" description="Cover for accidental bike damage during your booking." meta={`€${extra.price}`} onClick={() => toggle(extra.id)} />)}</div><div className="mt-10 flex justify-between"><Link href={`/bike/${booking.bikeId ?? "touring-bike"}`} className="text-xs font-bold text-ink/55">Back to bike</Link><Link href="/booking/summary" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Review booking ↗</Link></div></BookingLayout>;
}
