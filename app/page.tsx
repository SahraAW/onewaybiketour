import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/lib/tours";

export default function Home() {
  return <><Hero /><section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="eyebrow mb-5 text-orange">The long way around</p><h2 className="display text-5xl font-bold md:text-7xl">Routes with<br /><span className="text-orange">a pulse.</span></h2></div><p className="max-w-md text-base leading-relaxed text-ink/60">Choose a direction, take your time, and let the landscape do the talking. Every route is designed to be ridden, not rushed.</p></div><div className="mt-14">{tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div></section><section className="border-y border-ink/15 bg-[#dedad6] px-5 py-20 md:px-10 md:py-28"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><p className="eyebrow text-orange">01 / Pick a line</p><h2 className="mt-5 text-2xl font-bold tracking-[-.05em]">Routes that make the map feel personal.</h2></div><div><p className="eyebrow text-orange">02 / Ride your way</p><h2 className="mt-5 text-2xl font-bold tracking-[-.05em]">Comfort bikes, gravel bikes and room to wander.</h2></div><div><p className="eyebrow text-orange">03 / Remember it</p><h2 className="mt-5 text-2xl font-bold tracking-[-.05em]">A trip that stays with you after the last kilometre.</h2></div></div></section><Footer /></>;
}
