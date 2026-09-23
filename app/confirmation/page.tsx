"use client";

import Link from "next/link";
import { useState } from "react";
import { BookingLayout } from "@/components/BookingLayout";
import { bikes, getBookingTotal, getTour } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export default function ConfirmationPage() {
  const { booking } = useBooking();
  const [downloaded, setDownloaded] = useState(false);
  const tour = getTour(booking.tourId);
  const bike = bikes.find((item) => item.id === booking.bikeId);
  const reference = `OW-${(booking.tourId ?? "RIDE").slice(0, 4).toUpperCase()}-${booking.date?.replaceAll("-", "") ?? "DEMO"}`;
  const downloadBooking = () => {
    const calendar = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `SUMMARY:${tour?.name ?? "One Way bike tour"}`, `DTSTART:${booking.date?.replaceAll("-", "") ?? "20260101"}`, `DESCRIPTION:Booking ${reference} - ${bike?.name ?? "Bike"}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([calendar], { type: "text/calendar" }));
    link.download = `${reference}.ics`;
    link.click();
    URL.revokeObjectURL(link.href);
    setDownloaded(true);
  };
  const qrData = typeof window === "undefined" ? reference : window.location.href;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(qrData)}`;
  return <BookingLayout step="summary"><div className="max-w-2xl rounded-[2rem] border border-orange/35 bg-orange/10 p-7 md:p-12"><p className="eyebrow text-orange">Booking confirmed</p><h1 className="display mt-5 text-6xl font-bold md:text-8xl">See you<br /><span className="text-orange">out there.</span></h1><p className="mt-6 text-sm leading-relaxed text-ink/65">Scan the QR code to keep your booking close, add it to Apple Wallet, or download the calendar file.</p><div className="mt-8 grid gap-8 border-y border-ink/15 py-8 md:grid-cols-[auto_1fr] md:items-center"><div className="rounded-2xl bg-white p-3"><img src={qrUrl} alt="QR code for your booking" width="200" height="200" /></div><div className="text-sm"><p className="text-xs text-ink/45">Reference</p><strong className="text-xl">{reference}</strong><p className="mt-5">{tour?.name} · {booking.date}</p><p>{bike?.name} · size {booking.bikeSize}</p><p className="mt-3 font-bold">Total €{getBookingTotal(booking)}</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={downloadBooking} className="rounded-full bg-black px-5 py-3 text-[11px] font-bold text-white">Add to Apple Wallet ↗</button><button type="button" onClick={downloadBooking} className="rounded-full border border-ink px-5 py-3 text-[11px] font-bold">{downloaded ? "Downloaded" : "Download booking"} ↓</button></div></div></div><Link href="/tours" className="mt-8 inline-flex rounded-full bg-orange px-6 py-3 text-[11px] font-bold text-white">Explore more tours ↗</Link></div></BookingLayout>;
}
