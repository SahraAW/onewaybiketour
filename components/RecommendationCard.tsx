import Link from "next/link";
import type { TourRecommendation } from "@/lib/recommendations";

export function RecommendationCard({ recommendation }: Readonly<{ recommendation: TourRecommendation }>) {
  const { tour, reasons } = recommendation;
  const reasonLabel = reasons.includes("A strong all-round route") ? reasons[0] : `Recommended for your ${reasons.join(" & ").toLowerCase()}`;
  return (
    <article className="recommendation-card">
      <div className="recommendation-card-image relative aspect-[16/9] w-full">
        <img src={tour.image} alt={`${tour.name} cycling tour`} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="recommendation-card-content min-w-0">
        <p className="eyebrow text-orange">{tour.start} → {tour.end}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-.05em]">{tour.name}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">{tour.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-ink/55">
          <span>{tour.distance}</span><span>·</span><span className="capitalize">{tour.terrain}</span><span>·</span><span>{tour.difficulty}</span>
        </div>
        <p className="recommendation-reason mt-4 text-xs font-bold text-orange">{reasonLabel}</p>
        <Link href={`/tours/${tour.id}`} className="mt-5 inline-flex rounded-full border border-ink/25 px-5 py-2.5 text-[10px] font-bold hover:border-orange hover:text-orange">Choose tour ↗</Link>
      </div>
    </article>
  );
}
