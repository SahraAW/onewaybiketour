import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/lib/tours";

export default function ToursPage() {
  return <><Navbar /><main className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-10 md:pt-20"><div className="mb-20 max-w-2xl"><p className="eyebrow mb-6 text-orange">Explore tours / 01</p><h1 className="display text-7xl font-bold md:text-9xl">Choose your<br /><span className="text-orange">direction.</span></h1><p className="mt-8 max-w-md text-base leading-relaxed text-ink/65">From a single day beside the Danish coast to a three-day alpine descent. Every route begins with a line on the map.</p></div><div>{tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div></main><Footer /></>;
}
