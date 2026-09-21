"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookingLayout } from "@/components/BookingLayout";
import { useBooking } from "@/components/BookingProvider";
import { bikes, extras } from "@/lib/booking";

export default function BikeDetailPage() {
  const params = useParams<{ id: string }>();
  const { booking, updateBooking } = useBooking();
  const bike = bikes.find((item) => item.id === params.id) ?? bikes[0];
  return <BookingLayout step="bike"><div className="bike-detail"><Link href="/booking/bike" className="text-sm font-medium text-orange">‹&nbsp; back to bikes</Link><div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-center"><div className="bike-detail-image" style={{ backgroundImage: `url("${bike.image}")` }} role="img" aria-label={bike.name} /><div><p className="eyebrow text-orange">Bike type / {bike.terrain}</p><h1 className="display mt-4 text-6xl font-bold md:text-8xl">{bike.name}</h1><p className="mt-5 text-sm leading-relaxed text-ink/60">{bike.description}</p><p className="mt-5 text-xl font-bold">from €{bike.price}</p><div className="mt-7"><p className="eyebrow mb-3">Size</p><div className="flex flex-wrap gap-2">{bike.sizes.map((size) => <button type="button" key={size} onClick={() => updateBooking({ bikeId: bike.id, bikeSize: size })} className={`bike-size ${booking.bikeSize === size && booking.bikeId === bike.id ? "selected" : ""}`}>{size}</button>)}</div><button type="button" className="mt-3 text-xs font-bold text-orange">Size guide</button></div><Link href="/booking/extras" onClick={() => updateBooking({ bikeId: bike.id })} className="mt-8 inline-flex rounded-full bg-orange px-7 py-3 text-[11px] font-bold text-white">Continue to insurance ↗</Link></div></div></div></BookingLayout>;
}