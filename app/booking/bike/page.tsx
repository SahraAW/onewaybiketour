"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BikeCarousel } from "@/components/BikeCarousel";

export default function BookingBikePage() {
  return <BookingLayout step="bike"><p className="eyebrow text-orange">Step 02 / Bike type</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Find your<br /><span className="text-orange">ride.</span></h1><p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">Choose the bike that fits the way you want to travel. Swipe, use the arrows, or tap a card to see its details.</p><div className="mt-10"><BikeCarousel /></div><div className="mt-10"><Link href="/booking/date" className="text-xs font-bold text-ink/55">‹&nbsp; Back to date</Link></div></BookingLayout>;
}
