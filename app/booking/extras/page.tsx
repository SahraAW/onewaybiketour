"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { bikes, extras } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function BookingExtrasPage() {
  const { booking, updateBooking } = useBooking();
  const bike = bikes.find((item) => item.id === booking.bikeId);
  const toggle = (id: string) =>
    updateBooking({ extraIds: booking.extraIds.includes(id) ? booking.extraIds.filter((item) => item !== id) : [...booking.extraIds, id] });
  const equipment = extras.filter((extra) => extra.id !== "insurance" && (bike?.addons ?? []).includes(extra.id));
  const insurance = extras.filter((extra) => extra.id === "insurance");

  return (
    <BookingLayout step="extras">
      <p className="eyebrow text-orange">Step 04 / Extras</p>
      <h1 className="display mt-5 text-6xl font-bold md:text-8xl">
        Pack for<br /><span className="text-orange">the ride.</span>
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">
        Add equipment for your {bike?.name ?? "bike"}, then decide on ride protection.
      </p>

      <p className="eyebrow mt-10 mb-3 text-ink/45">Equipment</p>
      <div className="space-y-3">
        {equipment.length ? equipment.map((extra) => (
          <BookingOption
            key={extra.id}
            selected={booking.extraIds.includes(extra.id)}
            title={extra.name}
            description={extra.description}
            meta={`€${extra.price}`}
            onClick={() => toggle(extra.id)}
          />
        )) : <p className="text-xs text-ink/50">No optional equipment for this bike.</p>}
      </div>

      <p className="eyebrow mt-8 mb-3 text-ink/45">Ride protection</p>
      <div className="space-y-3">
        {insurance.map((extra) => (
          <BookingOption
            key={extra.id}
            selected={booking.extraIds.includes(extra.id)}
            title="Ride protection"
            description="Cover for accidental bike damage during your booking."
            meta={`€${extra.price}`}
            onClick={() => toggle(extra.id)}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-between">
        <Link href="/booking/size" className="text-xs font-bold text-ink/55">Back to size</Link>
        <Link href="/booking/summary" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Review booking ↗</Link>
      </div>
    </BookingLayout>
  );
}

