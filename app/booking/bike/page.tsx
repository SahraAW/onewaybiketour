"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { bikes } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function BookingBikePage() {
  const { booking, updateBooking } = useBooking();
  return <BookingLayout step="bike"><p className="eyebrow text-orange">Step 02 / Bike</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Find your<br /><span className="text-orange">ride.</span></h1><div className="mt-10 space-y-3">{bikes.map((bike) => <BookingOption key={bike.id} selected={booking.bikeId === bike.id} title={bike.name} description={`${bike.type} · ${bike.description}`} meta={`€${bike.price}`} onClick={() => updateBooking({ bikeId: bike.id })} />)}</div><div className="mt-10 flex justify-between"><Link href="/booking/date" className="text-xs font-bold text-ink/55">Back</Link><Link href="/booking/size" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Choose size ↗</Link></div></BookingLayout>;
}
