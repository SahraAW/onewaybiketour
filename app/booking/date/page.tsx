"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookingLayout } from "@/components/BookingLayout";
import { useBooking } from "@/components/BookingProvider";
import { getCalendarMonth } from "@/lib/booking";

export default function BookingDatePage() {
  const { booking, updateBooking } = useBooking();
  const today = new Date();
  const monthDates = useMemo(() => getCalendarMonth(today.getFullYear(), today.getMonth()), [today]);
  const firstAvailableDate = monthDates.find((item) => item.available)?.date ?? null;
  const [selected, setSelected] = useState(booking.date ?? firstAvailableDate);
  const [pickupHour, setPickupHour] = useState(13);
  const firstWeekday = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthLabel = today.toLocaleDateString("en-US", { month: "long" });
  const selectedDate = monthDates.find((item) => item.date === selected);
  const chooseDate = (date: string, available: boolean) => { if (available) setSelected(date); };
  return <BookingLayout step="date"><div className="calendar-screen"><div className="calendar-pickup"><div className="flex items-center gap-3"><span className="calendar-chevron" aria-hidden="true">⌄</span><span className="text-xl font-medium">pick up</span></div><div className="mt-7 flex items-center gap-5"><button type="button" onClick={() => setPickupHour((hour) => Math.max(8, hour - 1))} className="calendar-round-button" aria-label="Earlier pickup time">−</button><output className="flex-1 text-center text-2xl font-medium">{String(pickupHour).padStart(2, "0")}:00</output><button type="button" onClick={() => setPickupHour((hour) => Math.min(20, hour + 1))} className="calendar-round-button" aria-label="Later pickup time">+</button></div><input aria-label="Pickup time" type="range" min="8" max="20" value={pickupHour} onChange={(event) => setPickupHour(Number(event.target.value))} className="calendar-slider mt-7" /></div><div className="calendar-month mt-16"><h1 className="text-3xl font-medium capitalize">{monthLabel}</h1><div className="calendar-grid mt-5" aria-label={`${monthLabel} availability calendar`}>{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`} className="calendar-weekday">{day}</span>)}{Array.from({ length: firstWeekday }, (_, index) => <span key={`empty-${index}`} />)}{monthDates.map((item) => { const date = new Date(`${item.date}T12:00:00`); const isSelected = selected === item.date; return <button key={item.date} type="button" disabled={!item.available} onClick={() => chooseDate(item.date, item.available)} className={`calendar-day calendar-day-${item.priceTier} ${isSelected ? "calendar-day-selected" : ""} ${!item.available ? "calendar-day-disabled" : ""}`} aria-label={`${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}${item.available ? `, ${item.priceTier} price` : ", unavailable"}`}>{date.getDate()}</button>; })}</div><div className="calendar-legend mt-7"><span><i className="calendar-dot calendar-dot-premium" />Higher price</span><span><i className="calendar-dot calendar-dot-value" />Lower price</span><span><i className="calendar-dot calendar-dot-standard" />Standard</span></div>{selectedDate && <p className="mt-5 text-xs text-ink/55">Selected: <strong className="text-ink">{new Date(`${selectedDate.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</strong> · pickup {String(pickupHour).padStart(2, "0")}:00</p>}</div><div className="mt-12 flex items-center justify-between"><Link href="/tours" className="text-base font-medium text-orange">‹&nbsp; back</Link><Link href="/booking/bike" onClick={() => updateBooking({ date: selected })} className="rounded-full bg-orange px-9 py-4 text-base font-medium text-white">Continue</Link></div></div></BookingLayout>;
}
