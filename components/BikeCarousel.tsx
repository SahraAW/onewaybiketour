"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { bikes } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export function BikeCarousel() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();
  const initialIndex = Math.max(0, bikes.findIndex((bike) => bike.id === booking.bikeId));
  const [index, setIndex] = useState(initialIndex);
  const startX = useRef<number | null>(null);
  const bike = bikes[index];
  const move = (direction: number) => setIndex((current) => (current + direction + bikes.length) % bikes.length);
  const choose = () => { updateBooking({ bikeId: bike.id }); router.push(`/bike/${bike.id}`); };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  };
  return (
    <section
      className="bike-carousel"
      aria-roledescription="carousel"
      aria-label="Bike selection"
      onPointerDown={(event) => { startX.current = event.clientX; }}
      onPointerUp={(event) => {
        if (startX.current === null) return;
        const delta = event.clientX - startX.current;
        if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="bike-carousel-stage">
        <div className="bike-carousel-peek bike-carousel-peek-left" aria-hidden="true" style={{ backgroundImage: `url("${bikes[(index - 1 + bikes.length) % bikes.length].image}")` }} />
        <button type="button" onClick={() => move(-1)} className="bike-arrow bike-arrow-left" aria-label="Previous bike">‹</button>
        <button type="button" onClick={choose} onKeyDown={onKeyDown} className="bike-slide" aria-label={`Choose ${bike.name}`}>
          <div className="bike-slide-image" style={{ backgroundImage: `url("${bike.image}")` }} />
          <div className="bike-slide-copy">
            <p className="eyebrow text-orange">{index === 0 ? "Our suggestion" : bike.type}</p>
            <h2>{bike.name}</h2>
            <p>{bike.description}</p>
            <strong>from €{bike.price}</strong>
          </div>
        </button>
        <button type="button" onClick={() => move(1)} className="bike-arrow bike-arrow-right" aria-label="Next bike">›</button>
        <div className="bike-carousel-peek bike-carousel-peek-right" aria-hidden="true" style={{ backgroundImage: `url("${bikes[(index + 1) % bikes.length].image}")` }} />
      </div>
      <div className="bike-carousel-dots" aria-label="Bike carousel navigation">
        {bikes.map((item, itemIndex) => (
          <button type="button" key={item.id} onClick={() => setIndex(itemIndex)} className={itemIndex === index ? "active" : ""} aria-label={`Show ${item.name}`} aria-current={itemIndex === index} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-ink/50">Tap a bike, or use the arrow keys, to view details</p>
    </section>
  );
}
