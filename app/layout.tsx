import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingProvider";

export const metadata: Metadata = {
  title: "One way bike tours",
  description: "One-way and round-trip bike tours in Denmark and across Europe."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="da"><body><BookingProvider><Navbar />{children}<Footer /></BookingProvider></body></html>;
}
