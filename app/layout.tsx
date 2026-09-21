import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One way bike tours",
  description: "One-way and round-trip bike tours in Denmark and across Europe."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
