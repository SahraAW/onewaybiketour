"use client";

import { useRef, useState } from "react";
import type { TourRecommendation } from "@/lib/recommendations";
import { RecommendationCard } from "@/components/RecommendationCard";

export function TourCarousel({ recommendations }: Readonly<{ recommendations: TourRecommendation[] }>) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const move = (direction: number) => setActive((current) => (current + direction + recommendations.length) % recommendations.length);
  if (!recommendations.length) return <p className="rounded-2xl border border-dashed border-ink/20 p-6 text-sm text-ink/55">No recommendations yet. Retake the questions to build your route profile.</p>;
  const recommendation = recommendations[active];
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    startX.current = null;
  };
  return <div className="tour-carousel" onPointerDown={(event) => { startX.current = event.clientX; }} onPointerUp={handlePointerUp}><div className="carousel-stage"><div className="carousel-peek carousel-peek-left" aria-hidden="true" style={{ backgroundImage: `url("${recommendations[(active - 1 + recommendations.length) % recommendations.length].tour.image}")` }} /><button type="button" onClick={() => move(-1)} className="carousel-arrow" aria-label="Previous recommendation">‹</button><div className="carousel-card"><RecommendationCard recommendation={recommendation} /></div><button type="button" onClick={() => move(1)} className="carousel-arrow" aria-label="Next recommendation">›</button><div className="carousel-peek carousel-peek-right" aria-hidden="true" style={{ backgroundImage: `url("${recommendations[(active + 1) % recommendations.length].tour.image}")` }} /></div><div className="carousel-dots" aria-label="Recommendation navigation">{recommendations.map((item, index) => <button type="button" key={item.tour.id} onClick={() => setActive(index)} className={index === active ? "active" : ""} aria-label={`Show ${item.tour.name}`} />)}</div><p className="mt-3 text-center text-[10px] text-ink/45">{active + 1} of {recommendations.length} recommendations</p></div>;
}
