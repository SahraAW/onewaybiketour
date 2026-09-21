import { Tour } from "@/lib/tours";
import { Button } from "./Button";

export function TourCard({ tour }: { tour: Tour }) {
  return <article className="group flex flex-col border-t border-ink/20 py-6 md:grid md:grid-cols-[180px_1.3fr_1fr_auto] md:items-end md:gap-8">
    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#dedad6]" style={{ backgroundImage: `url("${tour.image}")`, backgroundPosition: "center", backgroundSize: "cover" }} role="img" aria-label={`${tour.name} cycling tour`} />
    <div><p className="eyebrow mb-3 text-orange">{tour.start} → {tour.end}</p><h2 className="text-3xl font-bold tracking-[-.06em]">{tour.name}</h2><p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">{tour.description}</p></div>
    <dl className="mt-6 grid grid-cols-3 gap-3 text-xs md:mt-0"><div><dt className="mb-1 text-ink/45">Distance</dt><dd className="font-bold">{tour.distance}</dd></div><div><dt className="mb-1 text-ink/45">Duration</dt><dd className="font-bold">{tour.duration}</dd></div><div><dt className="mb-1 text-ink/45">Level</dt><dd className="font-bold">{tour.difficulty}</dd></div></dl>
    <div className="flex items-center justify-between gap-4 md:block"><p className="text-sm font-bold">From €{tour.price}</p><Button href={`/tours/${tour.id}`} variant="outline">View tour <span className="ml-3 text-orange">↗</span></Button></div>
  </article>;
}
