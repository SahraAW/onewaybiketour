"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { useBooking } from "@/components/BookingProvider";

function nextDates() { return Array.from({ length: 14 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() + index + 2); return date.toISOString().slice(0, 10); }); }

export default function BookingDatePage() {
  const { booking, updateBooking } = useBooking();
  const dates = nextDates();
  const [selected, setSelected] = useState(booking.date ?? dates[0]);
  return <BookingLayout step="date"><p className="eyebrow text-orange">Step 01 / Date</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Pick a<br /><span className="text-orange">day.</span></h1><p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">Choose an available start date for your ride. Availability is ready to be replaced by a live API later.</p><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">{dates.map((date) => <button key={date} type="button" onClick={() => setSelected(date)} className={`rounded-2xl border p-4 text-left ${selected === date ? "border-orange bg-orange/10" : "border-ink/15 bg-white/25"}`}><span className="block text-[10px] uppercase text-ink/45">{new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" })}</span><strong className="mt-2 block text-xl">{new Date(`${date}T12:00:00`).getDate()}</strong><span className="text-[10px] text-ink/50">{new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "short" })}</span></button>)}</div><div className="mt-10 flex justify-between"><Link href="/tours" className="text-xs font-bold text-ink/55">Back</Link><Link href="/booking/bike" onClick={() => updateBooking({ date: selected })} className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Choose bike ↗</Link></div></BookingLayout>;
}
