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
  const rows: Array<[string, string, string]> = [
    ["Tour", tour?.name ?? "Not selected", "/recommendations"],
    ["Date", booking.date ?? "Not selected", "/booking/date"],
    ["Bike", bike?.name ?? "Not selected", "/booking/bike"],
    ["Size", booking.bikeSize ?? "Not selected", `/bike/${booking.bikeId ?? "touring-bike"}`],
    ["Extras", selectedExtras.length ? selectedExtras.map((item) => item.name).join(", ") : "None", "/booking/extras"]
  ];
  return (
    <BookingLayout step="summary">
      <p className="eyebrow text-orange">Step 05 / Summary</p>
      <h1 className="display mt-5 text-6xl font-bold md:text-8xl">
        One clear<br /><span className="text-orange">plan.</span>
      </h1>
      <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
        {rows.map(([label, value, href]) => (
          <div key={label} className="flex items-center justify-between gap-5 py-4 text-sm">
            <span className="text-ink/50">{label}</span>
            <span className="flex items-center gap-3">
              <strong className="text-right">{value}</strong>
              <Link href={href} className="text-[10px] font-bold text-orange">Edit</Link>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <label className="text-xs text-ink/55" htmlFor="quantity">Riders</label>
        <input
          id="quantity"
          type="number"
          min="1"
          max="8"
          value={booking.quantity}
          onChange={(event) => updateBooking({ quantity: Math.max(1, Number(event.target.value)) })}
          className="w-20 rounded-full border border-ink/20 bg-transparent px-4 py-2 text-sm"
        />
      </div>
      <div className="mt-10 flex justify-between">
        <Link href="/booking/extras" className="text-xs font-bold text-ink/55">Edit choices</Link>
        <Link href="/checkout" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Continue to checkout ↗</Link>
      </div>
      <p className="mt-5 text-xs text-ink/45">Current total: €{getBookingTotal(booking)}</p>
    </BookingLayout>
  );
}

