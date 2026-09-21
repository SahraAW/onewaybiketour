"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { bikes, extras, getBookingTotal, getTour } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function BookingSummaryPage() {
  const { booking, updateBooking } = useBooking();
  const tour = getTour(booking.tourId);
  const bike = bikes.find((item) => item.id === booking.bikeId);
  const selectedExtras = extras.filter((item) => booking.extraIds.includes(item.id));
  return <BookingLayout step="summary"><p className="eyebrow text-orange">Step 05 / Summary</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">One clear<br /><span className="text-orange">plan.</span></h1><div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">{[["Tour", tour?.name ?? "Not selected"], ["Date", booking.date ?? "Not selected"], ["Bike", bike?.name ?? "Not selected"], ["Size", booking.bikeSize ?? "Not selected"], ["Extras", selectedExtras.length ? selectedExtras.map((item) => item.name).join(", ") : "None"]].map(([label, value]) => <div key={label} className="flex justify-between gap-5 py-4 text-sm"><span className="text-ink/50">{label}</span><strong className="text-right">{value}</strong></div>)}</div><div className="mt-6 flex items-center gap-3"><label className="text-xs text-ink/55" htmlFor="quantity">Riders</label><input id="quantity" type="number" min="1" max="8" value={booking.quantity} onChange={(event) => updateBooking({ quantity: Math.max(1, Number(event.target.value)) })} className="w-20 rounded-full border border-ink/20 bg-transparent px-4 py-2 text-sm" /></div><div className="mt-10 flex justify-between"><Link href="/booking/extras" className="text-xs font-bold text-ink/55">Edit choices</Link><Link href="/checkout" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Continue to checkout ↗</Link></div><p className="mt-5 text-xs text-ink/45">Current total: €{getBookingTotal(booking)}</p></BookingLayout>;
}
