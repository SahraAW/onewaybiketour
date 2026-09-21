import { tours, type Tour } from "@/lib/tours";

export type Bike = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  image: string;
};

export type Extra = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const bikes: Bike[] = [
  { id: "city-step", name: "City step", type: "Comfort bike", description: "A relaxed upright ride for easy coastal roads.", price: 28, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85" },
  { id: "gravel-runner", name: "Gravel runner", type: "Gravel bike", description: "Light, quick and ready for forest roads.", price: 42, image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=85" },
  { id: "alpine-carbon", name: "Alpine carbon", type: "Road bike", description: "A responsive road bike for long mountain days.", price: 58, image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=85" }
];

export const extras: Extra[] = [
  { id: "helmet", name: "Helmet", description: "A fitted safety helmet for the whole ride.", price: 6 },
  { id: "bike-bag", name: "Bike bag", description: "Keep essentials close without a backpack.", price: 12 },
  { id: "insurance", name: "Ride protection", description: "Cover for accidental bike damage.", price: 9 }
];

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
  if (!tour) return 0;
  return tour.id === "alps-to-adriatic" ? 220 : tour.id === "fjord-to-fjord" ? 145 : 89;
}

export function getBookingTotal(state: BookingState): number {
  const tour = getTour(state.tourId);
  const bike = bikes.find((item) => item.id === state.bikeId);
  const selectedExtras = extras.filter((item) => state.extraIds.includes(item.id));
  return (getTourPrice(tour) + (bike?.price ?? 0) + selectedExtras.reduce((sum, item) => sum + item.price, 0)) * state.quantity;
}
