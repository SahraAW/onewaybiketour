"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BookingLayout } from "@/components/BookingLayout";
import { getBookingTotal } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function CheckoutPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError(""); setLoading(true); window.setTimeout(() => { setLoading(false); router.push("/confirmation"); }, 500); };
  return <BookingLayout step="summary"><p className="eyebrow text-orange">Checkout / Test booking</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">Almost<br /><span className="text-orange">there.</span></h1><p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">This is a test checkout. No payment is processed. The payment section is structured for a future Stripe integration.</p><form onSubmit={submit} className="mt-10 max-w-xl space-y-5"><label className="block text-xs font-bold">Name<input required value={booking.customer.name} onChange={(event) => updateBooking({ customer: { ...booking.customer, name: event.target.value } })} className="mt-2 w-full rounded-full border border-ink/20 bg-transparent px-5 py-3" placeholder="Your name" /></label><label className="block text-xs font-bold">Email<input required type="email" value={booking.customer.email} onChange={(event) => updateBooking({ customer: { ...booking.customer, email: event.target.value } })} className="mt-2 w-full rounded-full border border-ink/20 bg-transparent px-5 py-3" placeholder="you@example.com" /></label><div className="rounded-2xl border border-dashed border-ink/25 p-5 text-sm text-ink/55">Payment provider placeholder<br /><span className="text-xs">Connect Stripe here when a backend/payment key is available.</span></div>{error && <p className="text-xs text-red-700">{error}</p>}<div className="flex items-center justify-between"><span className="text-sm">Total <strong>€{getBookingTotal(booking)}</strong></span><button disabled={loading} className="rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white disabled:opacity-50">{loading ? "Reserving..." : "Complete test booking ↗"}</button></div></form></BookingLayout>;
}
