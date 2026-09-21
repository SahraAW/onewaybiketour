import { tours, type Tour } from "@/lib/tours";

export type Bike = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  image: string;
  terrain: "paved" | "gravel" | "mixed";
  sizes: string[];
  addons: string[];
};

export type Extra = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Availability = {
  date: string;
  available: boolean;
  priceTier: "premium" | "value" | "standard";
  priceModifier: number;
};

export const bikes: Bike[] = [
  { id: "touring-bike", name: "Touring Bike", type: "Touring", description: "A lightweight and comfortable trekking bike, perfect for city rides and longer tours.", price: 200, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=90", terrain: "paved", sizes: ["S", "M", "L+"], addons: ["helmet", "front-bags", "panniers", "phone-holder"] },
  { id: "gravel-bike", name: "Gravel Bike", type: "Gravel", description: "Fast and stable on gravel roads, quiet lanes and everything between.", price: 250, image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=90", terrain: "gravel", sizes: ["S", "M", "L+"], addons: ["helmet", "front-bags", "phone-holder"] },
  { id: "e-bike", name: "E-Bike", type: "Electric bike", description: "Extra assistance for long distances, rolling hills and relaxed exploration.", price: 290, image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=90", terrain: "mixed", sizes: ["S", "M", "L+"], addons: ["helmet", "front-bags", "phone-holder"] }
];

export const extras: Extra[] = [
  { id: "helmet", name: "Helmet", description: "A fitted safety helmet for the whole ride.", price: 6 },
  { id: "front-bags", name: "Front bags", description: "Small front bags for essentials.", price: 10 },
  { id: "panniers", name: "Panniers / bags", description: "Carry more without slowing down.", price: 18 },
  { id: "phone-holder", name: "Phone holder", description: "Keep navigation visible on the move.", price: 5 },
  { id: "bike-bag", name: "Bike bag", description: "Keep essentials close without a backpack.", price: 12 },
  { id: "insurance", name: "Ride protection", description: "Cover for accidental bike damage.", price: 9 }
];

export function getAvailableDates(count = 30): Availability[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 2);
    const priceTier = index % 5 === 0 ? "premium" : index % 5 === 2 || index % 5 === 3 ? "value" : "standard";
    return { date: date.toISOString().slice(0, 10), available: index % 7 !== 4, priceTier, priceModifier: priceTier === "premium" ? 18 : priceTier === "value" ? -12 : 0 };
  });
}

export function getCalendarMonth(year: number, month: number): Availability[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month, day);
    const dayOffset = Math.max(0, Math.ceil((date.getTime() - today.getTime()) / 86400000));
    const priceTier = day % 5 === 0 || day % 7 === 0 ? "premium" : day % 5 === 1 || day % 5 === 2 ? "value" : "standard";
    return { date: date.toISOString().slice(0, 10), available: date >= today && dayOffset % 7 !== 4, priceTier, priceModifier: priceTier === "premium" ? 18 : priceTier === "value" ? -12 : 0 };
  });
}

export type BookingState = {
  tourId: string | null;
  date: string | null;
  bikeId: string | null;
  bikeSize: string | null;
  extraIds: string[];
  quantity: number;
  customer: { name: string; email: string };
};

export const initialBooking: BookingState = {
  tourId: null,
  date: null,
  bikeId: null,
  bikeSize: null,
  extraIds: [],
  quantity: 1,
  customer: { name: "", email: "" }
};

export function getTour(id: string | null): Tour | undefined {
  return tours.find((tour) => tour.id === id);
}

export function getTourPrice(tour: Tour | undefined): number {
  return tour?.price ?? 0;
}

export function getBookingTotal(state: BookingState): number {
  const tour = getTour(state.tourId);
  const bike = bikes.find((item) => item.id === state.bikeId);
  const selectedExtras = extras.filter((item) => state.extraIds.includes(item.id));
  return (getTourPrice(tour) + (bike?.price ?? 0) + selectedExtras.reduce((sum, item) => sum + item.price, 0)) * state.quantity;
}
