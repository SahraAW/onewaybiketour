"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BookingLayout } from "@/components/BookingLayout";
import { useBooking } from "@/components/BookingProvider";
import { bikes } from "@/lib/booking";

export default function BikeDetailPage() {
  const params = useParams<{ id: string }>();
  const { booking, updateBooking } = useBooking();
  const [showGuide, setShowGuide] = useState(false);
  const [showError, setShowError] = useState(false);
  const bike = bikes.find((item) => item.id === params.id) ?? bikes[0];
  const selectedSize = booking.bikeId === bike.id ? booking.bikeSize : null;

  const chooseSize = (size: string) => {
    updateBooking({ bikeId: bike.id, bikeSize: size });
    setShowError(false);
  };

  return (
    <BookingLayout step="size">
      <Link href="/booking/bike" className="text-sm font-medium text-orange">‹&nbsp; back to bikes</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
        <div className="bike-detail-image">
          <img src={bike.image} alt={bike.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="eyebrow text-orange">Bike type / {bike.terrain}</p>
          <h1 className="display mt-4 text-6xl font-bold md:text-8xl">{bike.name}</h1>
          <p className="mt-5 text-sm leading-relaxed text-ink/60">{bike.description}</p>
          <p className="mt-5 text-xl font-bold">from €{bike.price}</p>
          <div className="mt-7">
            <p className="eyebrow mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {bike.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => chooseSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`bike-size ${selectedSize === size ? "selected" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setShowGuide((value) => !value)} className="mt-3 text-xs font-bold text-orange" aria-expanded={showGuide}>
              {showGuide ? "Hide size guide" : "Size guide"}
            </button>
            {showGuide && (
              <div className="mt-3 max-w-sm rounded-2xl border border-ink/15 bg-white/40 p-4 text-xs leading-relaxed text-ink/65">
                <dl className="space-y-2">
                  <div className="flex justify-between"><dt className="font-bold text-ink">S</dt><dd>Riders up to 165 cm</dd></div>
                  <div className="flex justify-between"><dt className="font-bold text-ink">M</dt><dd>Riders 165–178 cm</dd></div>
                  <div className="flex justify-between"><dt className="font-bold text-ink">L+</dt><dd>Riders 178 cm and taller</dd></div>
                </dl>
              </div>
            )}
            {showError && <p role="alert" className="mt-3 text-xs font-bold text-orange">Please choose a size before continuing.</p>}
          </div>
          <Link
            href="/booking/extras"
            onClick={(event) => { if (!selectedSize) { event.preventDefault(); setShowError(true); } }}
            className={`mt-8 inline-flex rounded-full px-7 py-3 text-[11px] font-bold text-white transition-opacity ${selectedSize ? "bg-orange" : "bg-orange/50"}`}
          >
            Continue to extras ↗
          </Link>
        </div>
      </div>
    </BookingLayout>
  );
}
