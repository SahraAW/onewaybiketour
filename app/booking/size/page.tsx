"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { useBooking } from "@/components/BookingProvider";
import { bikes } from "@/lib/booking";

export default function BookingSizePage() {
  const { booking, updateBooking } = useBooking();
  const [showGuide, setShowGuide] = useState(false);
  const [showError, setShowError] = useState(false);
  const bike = bikes.find((item) => item.id === booking.bikeId);
  const sizes = bike?.sizes ?? ["S", "M", "L+"];

  const continueHref = () => {
    if (!booking.bikeSize) {
      setShowError(true);
      return false;
    }
    return true;
  };

  return (
    <BookingLayout step="size">
      <p className="eyebrow text-orange">Step 03 / Size</p>
      <h1 className="display mt-5 text-6xl font-bold md:text-8xl">
        Make it<br /><span className="text-orange">fit.</span>
      </h1>
      <p className="mt-6 max-w-md text-sm text-ink/60">
        Choose the frame size for your {bike?.name ?? "bike"}. M is a good starting point for riders around 165–178 cm.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {sizes.map((size) => (
          <BookingOption
            key={size}
            selected={booking.bikeSize === size}
            title={size}
            onClick={() => { updateBooking({ bikeSize: size }); setShowError(false); }}
          />
        ))}
      </div>
      <button type="button" onClick={() => setShowGuide((value) => !value)} className="mt-5 text-xs font-bold text-orange" aria-expanded={showGuide} aria-controls="size-guide">
        {showGuide ? "Hide size guide" : "What size should I choose?"}
      </button>
      {showGuide && (
        <div id="size-guide" className="mt-4 max-w-md rounded-2xl border border-ink/15 bg-white/40 p-5 text-xs leading-relaxed text-ink/65">
          <dl className="space-y-2">
            <div className="flex justify-between"><dt className="font-bold text-ink">S</dt><dd>Riders up to 165 cm</dd></div>
            <div className="flex justify-between"><dt className="font-bold text-ink">M</dt><dd>Riders 165–178 cm</dd></div>
            <div className="flex justify-between"><dt className="font-bold text-ink">L+</dt><dd>Riders 178 cm and taller</dd></div>
          </dl>
        </div>
      )}
      {showError && (
        <p role="alert" className="mt-5 text-xs font-bold text-orange">Please choose a size before continuing.</p>
      )}
      <div className="mt-10 flex justify-between">
        <Link href="/booking/bike" className="text-xs font-bold text-ink/55">Back</Link>
        <Link
          href="/booking/extras"
          onClick={(event) => { if (!continueHref()) event.preventDefault(); }}
          aria-disabled={!booking.bikeSize}
          className={`rounded-full px-6 py-3 text-[11px] font-bold text-white transition-opacity ${booking.bikeSize ? "bg-orange" : "bg-orange/50"}`}
        >
          Add extras ↗
        </Link>
      </div>
    </BookingLayout>
  );
}

