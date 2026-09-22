"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { BikeRecommendation } from "@/lib/booking";

export function BikeRecommendationCarousel({ recommendations }: Readonly<{ recommendations: BikeRecommendation[] }>) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const move = (direction: number) => setActive((current) => (current + direction + recommendations.length) % recommendations.length);
  if (!recommendations.length) return null;
  const recommendation = recommendations[active];
  const { bike, score, reasons } = recommendation;
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    startX.current = null;
  };

  return <div className="tour-carousel bike-recommendation-carousel" onPointerDown={(event) => { startX.current = event.clientX; }} onPointerUp={handlePointerUp}>
    <div className="carousel-stage">
      <button type="button" onClick={() => move(-1)} className="carousel-arrow" aria-label="Previous bike recommendation">‹</button>
      <div className="carousel-card">
        <article className="recommendation-card bike-recommendation-card overflow-hidden rounded-[1.5rem] border border-ink/15 bg-white/30">
          <div className="relative aspect-[4/3] w-full">
            <img src={bike.image} alt={`${bike.name} cycling bike`} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="recommendation-card-content min-w-0 p-5 md:p-7">
            <p className="eyebrow text-orange">{bike.type} / {score}% match</p>
            <h2 className="mt-2 break-words text-2xl font-bold">{bike.name}</h2>
            <p className="mt-3 break-words text-sm leading-relaxed text-ink/60">{bike.description}</p>
            <p className="recommendation-reason mt-4 break-words text-xs font-bold text-orange">Why it matches: {reasons.join(" · ")}</p>
            <Link href={`/bike/${bike.id}`} className="mt-5 inline-flex min-h-11 w-fit items-center rounded-full border border-ink/25 px-5 py-2.5 text-xs font-bold hover:border-orange hover:text-orange">View bike ↗</Link>
          </div>
        </article>
      </div>
      <button type="button" onClick={() => move(1)} className="carousel-arrow" aria-label="Next bike recommendation">›</button>
    </div>
    <div className="carousel-dots" aria-label="Bike recommendation navigation">{recommendations.map((item, index) => <button type="button" key={item.bike.id} onClick={() => setActive(index)} className={index === active ? "active" : ""} aria-label={`Show ${item.bike.name}`} />)}</div>
    <p className="mt-3 text-center text-[10px] text-ink/45">{active + 1} of {recommendations.length} recommendations</p>
  </div>;
}
