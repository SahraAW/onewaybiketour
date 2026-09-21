"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { bikes, getBookingTotal, getTour } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function ConfirmationPage() {
  const { booking } = useBooking();
  const tour = getTour(booking.tourId);
  const bike = bikes.find((item) => item.id === booking.bikeId);
  const reference = `OW-${(booking.tourId ?? "RIDE").slice(0, 4).toUpperCase()}-${booking.date?.replaceAll("-", "") ?? "DEMO"}`;
  return <BookingLayout step="summary"><div className="max-w-2xl rounded-[2rem] border border-orange/35 bg-orange/10 p-7 md:p-12"><p className="eyebrow text-orange">Booking confirmed</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">See you<br /><span className="text-orange">out there.</span></h1><p className="mt-6 text-sm leading-relaxed text-ink/65">Your test booking is saved locally. A real confirmation email and payment can be connected when the backend is available.</p><div className="mt-8 border-y border-ink/15 py-5 text-sm"><p className="text-xs text-ink/45">Reference</p><strong className="text-xl">{reference}</strong><p className="mt-5">{tour?.name} · {booking.date}</p><p>{bike?.name} · size {booking.bikeSize}</p><p className="mt-3 font-bold">Total €{getBookingTotal(booking)}</p></div><Link href="/tours" className="mt-8 inline-flex rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Explore more tours ↗</Link></div></BookingLayout>;
}
