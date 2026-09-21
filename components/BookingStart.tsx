"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTour } from "@/lib/booking";
import { useBooking } from "@/components/BookingProvider";

export function BookingStart({ tourId }: { tourId: string }) {
  const router = useRouter();
  const { updateBooking } = useBooking();
  useEffect(() => {
    if (getTour(tourId)) {
      updateBooking({ tourId, date: null, bikeId: null, bikeSize: null, extraIds: [], quantity: 1 });
      router.replace("/booking/date");
    } else router.replace("/tours");
  }, [router, tourId, updateBooking]);
  return <main className="grid min-h-screen place-items-center bg-paper"><p className="text-sm text-ink/55">Preparing your ride...</p></main>;
}
