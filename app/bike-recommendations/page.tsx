"use client";

import Link from "next/link";
import { useBooking } from "@/components/BookingProvider";
import { getBikeRecommendations } from "@/lib/booking";
import { BikeRecommendationCarousel } from "@/components/BikeRecommendationCarousel";

export default function BikeRecommendationsPage() {
  const { booking } = useBooking();
  const recommendations = booking.bikePreferences ? getBikeRecommendations(booking.bikePreferences) : [];
  return <main className="min-h-screen bg-paper"><section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pt-16"><div className="mx-auto max-w-3xl"><p className="eyebrow text-orange">Your bike fit / 05</p><h1 className="display mt-5 text-5xl font-bold md:text-8xl">Bikes we<br /><span className="text-orange">recommend.</span></h1><p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">Based on your answers, these bikes are a good match for your ride.</p></div><div className="mx-auto mt-10 w-full max-w-5xl"><BikeRecommendationCarousel recommendations={recommendations} /></div>{!recommendations.length && <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-ink/20 p-6 text-sm text-ink/60">Answer the bike questions to see recommendations based on your ride.</div>}<Link href="/booking/questions" className="mx-auto mt-10 block w-fit text-sm font-bold text-orange">Retake bike questions ↗</Link></section></main>;
}