import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { MapGraphic } from "@/components/MapGraphic";
import { Navbar } from "@/components/Navbar";
import { NavigationSteps } from "@/components/NavigationSteps";
import { tours } from "@/lib/tours";
import Link from "next/link";

export function generateStaticParams() { return tours.map((tour) => ({ id: tour.id })); }

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const tour = tours.find((item) => item.id === params.id);
  if (!tour) notFound();
  return <><Navbar /><main className="mx-auto max-w-7xl px-5 pb-24 md:px-10"><div className="grid gap-12 pt-8 md:grid-cols-[.9fr_1.1fr] md:items-center md:pt-16"><div><p className="eyebrow mb-6 text-orange">{tour.start} → {tour.end}</p><h1 className="display text-7xl font-bold md:text-9xl">{tour.name}</h1><p className="mt-8 max-w-md text-lg leading-relaxed text-ink/65">{tour.description}</p><div className="mt-10 flex flex-wrap gap-8 border-y border-ink/15 py-5 text-xs"><div><p className="mb-1 text-ink/45">Distance</p><strong>{tour.distance}</strong></div><div><p className="mb-1 text-ink/45">Duration</p><strong>{tour.duration}</strong></div><div><p className="mb-1 text-ink/45">Difficulty</p><strong>{tour.difficulty}</strong></div><div><p className="mb-1 text-ink/45">From</p><strong>€{tour.price}</strong></div></div><div className="mt-8"><Link href={`/booking/${tour.id}`} className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5">Book this tour <span className="ml-3">↗</span></Link></div></div><div className="grain relative min-h-[470px] overflow-hidden rounded-[2rem] bg-[#dedad6] p-8 text-orange"><div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url("${tour.image}")` }} /><div className="relative h-full"><MapGraphic detail /></div></div></div><section className="mt-24 grid gap-12 border-t border-ink/15 pt-8 md:grid-cols-2"><div><p className="eyebrow mb-5 text-orange">Included</p><h2 className="text-3xl font-bold tracking-[-.06em]">Everything you need<br />to start well.</h2><ul className="mt-8 divide-y divide-ink/15 border-y border-ink/15">{tour.included.map((item) => <li key={item} className="py-4 text-sm">{item}</li>)}</ul></div><div><p className="eyebrow mb-4 text-ink/45">Highlights</p><ul className="divide-y divide-ink/15 border-y border-ink/15">{tour.highlights.map((item, i) => <li key={item} className="flex justify-between py-4 text-sm"><span>{item}</span><span className="text-orange">0{i + 1}</span></li>)}</ul></div></section></main><NavigationSteps step={3} /><Footer /></>;
}
