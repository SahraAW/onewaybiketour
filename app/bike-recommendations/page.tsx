"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useBooking } from "@/components/BookingProvider";
import { getBikeRecommendations } from "@/lib/booking";

export default function BikeRecommendationsPage() {
  const { booking } = useBooking();
  const recommendations = booking.bikePreferences ? getBikeRecommendations(booking.bikePreferences) : [];
  return <main className="min-h-screen bg-paper"><Navbar /><section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pt-16"><div className="mx-auto max-w-3xl"><p className="eyebrow text-orange">Your bike fit / 05</p><h1 className="display mt-5 text-5xl font-bold md:text-8xl">Bikes we<br /><span className="text-orange">recommend.</span></h1><p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">Based on your answers, these bikes are a good match for your ride.</p></div><div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">{recommendations.map(({ bike, score, reasons }) => <article key={bike.id} className="flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-ink/15 bg-white/30"><div className="relative aspect-[4/3] w-full"><img src={bike.image} alt={`${bike.name} cycling bike`} className="absolute inset-0 h-full w-full object-cover" /></div><div className="flex min-w-0 flex-1 flex-col p-5"><p className="eyebrow text-orange">{bike.type} / {score}% match</p><h2 className="mt-2 break-words text-2xl font-bold">{bike.name}</h2><p className="mt-3 break-words text-sm leading-relaxed text-ink/60">{bike.description}</p><p className="mt-4 break-words text-xs font-bold text-orange">Why it matches: {reasons.join(" · ")}</p><Link href={`/bike/${bike.id}`} className="mt-5 inline-flex min-h-11 w-fit items-center rounded-full border border-ink/25 px-5 py-2.5 text-xs font-bold hover:border-orange hover:text-orange">View bike ↗</Link></div></article>)}</div>{!recommendations.length && <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-ink/20 p-6 text-sm text-ink/60">Answer the bike questions to see recommendations based on your ride.</div>}<Link href="/booking/questions" className="mx-auto mt-10 block w-fit text-sm font-bold text-orange">Retake bike questions ↗</Link></section><Footer /></main>;
}