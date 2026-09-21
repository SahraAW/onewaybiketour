"use client";

import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { BookingOption } from "@/components/BookingOption";
import { useBooking } from "@/components/BookingProvider";

const sizes = ["XS", "S", "M", "L", "XL"];
export default function BookingSizePage() {
  const { booking, updateBooking } = useBooking();
  return <BookingLayout step="size"><p className="eyebrow text-orange">Step 03 / Size</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Make it<br /><span className="text-orange">fit.</span></h1><p className="mt-6 max-w-md text-sm text-ink/60">Choose the frame size that feels most comfortable. M is a good starting point for riders around 165–178 cm.</p><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">{sizes.map((size) => <BookingOption key={size} selected={booking.bikeSize === size} title={size} onClick={() => updateBooking({ bikeSize: size })} />)}</div><div className="mt-10 flex justify-between"><Link href="/booking/bike" className="text-xs font-bold text-ink/55">Back</Link><Link href="/booking/extras" className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Add extras ↗</Link></div></BookingLayout>;
}
