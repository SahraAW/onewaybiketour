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
    <aside className="booking-summary rounded-[1.5rem] border border-ink/15 bg-white/35 p-5 lg:sticky lg:top-6">
      <p className="eyebrow mb-4 text-orange">Your booking</p>
      {tour ? (
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-[-.04em]">{tour.name}</h2>
            <p className="mt-1 text-xs text-ink/55">{tour.start} → {tour.end}</p>
          </div>
          <Link href="/recommendations" className="text-[10px] font-bold text-orange">Edit</Link>
        </div>
      ) : (
        <p className="text-sm text-ink/55">Choose a tour to begin.</p>
      )}
      <dl className="mt-6 space-y-3 border-y border-ink/15 py-4 text-xs">
        {booking.date && (
          <div className="flex items-center justify-between">
            <dt>Date</dt>
            <dd className="flex items-center gap-2 font-bold"><span>{booking.date}</span><Link href="/booking/date" className="text-orange" aria-label="Edit date">Edit</Link></dd>
          </div>
        )}
        {bike && (
          <div className="flex items-center justify-between">
            <dt>Bike</dt>
            <dd className="flex items-center gap-2 font-bold"><span>{bike.name}</span><Link href="/booking/bike" className="text-orange" aria-label="Edit bike">Edit</Link></dd>
          </div>
        )}
        {booking.bikeSize && (
          <div className="flex items-center justify-between">
            <dt>Size</dt>
            <dd className="flex items-center gap-2 font-bold"><span>{booking.bikeSize}</span><Link href={`/bike/${booking.bikeId ?? bike?.id ?? "touring-bike"}`} className="text-orange" aria-label="Edit size">Edit</Link></dd>
          </div>
        )}
        {selectedExtras.length > 0 && (
          <div className="flex items-center justify-between">
            <dt>Extras</dt>
            <dd className="flex items-center gap-2 font-bold"><span>{selectedExtras.length}</span><Link href="/booking/extras" className="text-orange" aria-label="Edit extras">Edit</Link></dd>
          </div>
        )}
      </dl>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-xs text-ink/55">Estimated total</span>
        <strong className="text-2xl">€{getBookingTotal(booking)}</strong>
      </div>
      {tour && <p className="mt-2 text-[10px] text-ink/45">Tour from €{getTourPrice(tour)} · quantity {booking.quantity}</p>}
      <Link href="/booking/summary" className="mt-5 block text-center text-[10px] font-bold text-orange">Review booking ↗</Link>
    </aside>
  );
}

