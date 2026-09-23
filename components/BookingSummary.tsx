"use client";

import Link from "next/link";
import { bikes, extras, getBookingTotal, getTour, getTourPrice } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export function BookingSummary() {
  const { booking } = useBooking();
  const tour = getTour(booking.tourId);
  const bike = bikes.find((item) => item.id === booking.bikeId);
  const selectedExtras = extras.filter((item) => booking.extraIds.includes(item.id));

  return (
    <aside className="rounded-[24px] border border-black bg-white/45 p-5 shadow-none backdrop-blur-[2px] lg:sticky lg:top-6">
      <p className="eyebrow mb-4">Your booking</p>

      {tour ? (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="break-words text-xl font-bold tracking-[-.04em]">{tour.name}</h2>
            <p className="mt-1 text-xs text-ink/55">{tour.start} → {tour.end}</p>
          </div>
          <Link href="/recommendations" className="text-[10px] font-bold text-orange">Edit</Link>
        </div>
      ) : (
        <p className="text-sm text-ink/55">Choose a tour to begin.</p>
      )}

      <dl className="mt-6 space-y-3 border-y border-black/15 py-4 text-xs">
        {booking.date && (
          <div className="flex items-center justify-between gap-2">
            <dt className="text-ink/55">Date</dt>
            <dd className="flex min-w-0 items-center gap-2 font-bold"><span className="break-words text-right">{booking.date}</span><Link href="/booking/date" className="shrink-0 text-orange" aria-label="Edit date">Edit</Link></dd>
          </div>
        )}
        {bike && (
          <div className="flex items-center justify-between gap-2">
            <dt className="text-ink/55">Bike</dt>
            <dd className="flex min-w-0 items-center gap-2 font-bold"><span className="break-words text-right">{bike.name}</span><Link href="/booking/bike" className="shrink-0 text-orange" aria-label="Edit bike">Edit</Link></dd>
          </div>
        )}
        {booking.bikeSize && (
          <div className="flex items-center justify-between gap-2">
            <dt className="text-ink/55">Size</dt>
            <dd className="flex items-center gap-2 font-bold"><span>{booking.bikeSize}</span><Link href={`/bike/${booking.bikeId ?? bike?.id ?? "touring-bike"}`} className="text-orange" aria-label="Edit size">Edit</Link></dd>
          </div>
        )}
        {selectedExtras.length > 0 && (
          <div className="flex items-center justify-between gap-2">
            <dt className="text-ink/55">Extras</dt>
            <dd className="flex items-center gap-2 font-bold"><span>{selectedExtras.length}</span><Link href="/booking/extras" className="text-orange" aria-label="Edit extras">Edit</Link></dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="text-xs text-ink/55">Estimated total</span>
        <strong className="text-2xl font-bold tracking-[-.04em]">€{getBookingTotal(booking)}</strong>
      </div>

      {tour && <p className="mt-2 text-[10px] text-ink/45">Tour from €{getTourPrice(tour)} · quantity {booking.quantity}</p>}
      <Link href="/booking/summary" className="mt-5 block rounded-[20px] border border-black bg-orange px-4 py-3 text-center text-[11px] font-bold text-white">Review booking ↗</Link>
    </aside>
  );
}

