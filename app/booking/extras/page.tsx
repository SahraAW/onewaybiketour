"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { extras } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function BookingExtrasPage() {
  const { booking, updateBooking } = useBooking();
  const toggle = (id: string) => updateBooking({ extraIds: booking.extraIds.includes(id) ? booking.extraIds.filter((item) => item !== id) : [...booking.extraIds, id] });
  return <BookingLayout step="extras"><p className="eyebrow text-orange">Step 04 / Extras</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Bring a<br /><span className="text-orange">little more.</span></h1><div className="mt-10 space-y-3">{extras.map((extra) => <BookingOption key={extra.id} selected={booking.extraIds.includes(extra.id)} title={extra.name} description={extra.description} meta={`€${extra.price}`} onClick={() => toggle(extra.id)} />)}</div><div className="mt-10 flex justify-between"><Link href="/booking/size" className="text-xs font-bold text-ink/55">Back</Link><Link href="/booking/summary" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Review booking ↗</Link></div></BookingLayout>;
}
