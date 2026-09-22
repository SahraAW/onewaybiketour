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

export type BikePreferences = {
  experience: string;
  priority: string;
  luggage: string;
  electric: string;
  height: string;
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
    const priceTier = index % 5 === 0 ? "premium" : getPriceTier(index);
    return { date: date.toISOString().slice(0, 10), available: index % 7 !== 4, priceTier, priceModifier: getPriceModifier(priceTier) };
  });
}

export function getCalendarMonth(year: number, month: number): Availability[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month, day);
    const dayOffset = Math.max(0, Math.ceil((date.getTime() - today.getTime()) / 86400000));
    const priceTier = day % 5 === 0 || day % 7 === 0 ? "premium" : getPriceTier(day);
    return { date: date.toISOString().slice(0, 10), available: date >= today && dayOffset % 7 !== 4, priceTier, priceModifier: getPriceModifier(priceTier) };
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
  bikePreferences: BikePreferences | null;
};

export const initialBooking: BookingState = {
  tourId: null,
  date: null,
  bikeId: null,
  bikeSize: null,
  extraIds: [],
  quantity: 1,
  customer: { name: "", email: "" },
  bikePreferences: null
};

export type BikeRecommendation = {
  bike: Bike;
  score: number;
  reasons: string[];
};

function getPriceTier(index: number): Availability["priceTier"] {
  if (index % 5 === 2 || index % 5 === 3) return "value";
  return "standard";
}

function getPriceModifier(priceTier: Availability["priceTier"]): number {
  if (priceTier === "premium") return 18;
  if (priceTier === "value") return -12;
  return 0;
}

export function getBikeRecommendations(preferences: BikePreferences): BikeRecommendation[] {
  return bikes.map((bike) => scoreBike(bike, preferences)).sort((first, second) => second.score - first.score);
}

type MatchRule = { matches: boolean; points: number; reason: string };

function getLuggageMatch(bike: Bike, luggage: string): { matches: boolean; reason: string } {
  if (luggage === "No luggage") return { matches: bike.id !== "touring-bike", reason: "Light setup" };
  if (luggage === "A small backpack") return { matches: bike.id === "touring-bike", reason: "Easy everyday setup" };
  return { matches: bike.addons.includes("panniers"), reason: "Ready for luggage" };
}

function scoreBike(bike: Bike, preferences: BikePreferences): BikeRecommendation {
  const luggage = getLuggageMatch(bike, preferences.luggage);
  const rules: MatchRule[] = [
    { matches: preferences.experience === "City rides" && bike.id === "touring-bike", points: 30, reason: "Comfortable for city rides" },
    { matches: preferences.experience === "Mountain rides" && bike.id === "gravel-bike", points: 30, reason: "Stable on varied terrain" },
    { matches: preferences.experience === "Track rides" && bike.id === "gravel-bike", points: 25, reason: "Fast and efficient" },
    { matches: preferences.priority === "Comfort and an upright riding position" && bike.id === "touring-bike", points: 35, reason: "Comfort-first geometry" },
    { matches: preferences.priority === "Speed and efficiency" && bike.id === "gravel-bike", points: 35, reason: "Built for speed" },
    { matches: preferences.priority === "Extra assistance when cycling" && bike.id === "e-bike", points: 40, reason: "Extra electric assistance" },
    { matches: preferences.priority === "Budget friendly" && bike.id === "touring-bike", points: 30, reason: "Best value option" },
    { matches: luggage.matches, points: 20, reason: luggage.reason },
    { matches: preferences.electric === "Very important" && bike.id === "e-bike", points: 35, reason: "Electric support included" },
    { matches: preferences.electric === "Nice to have" && bike.id === "e-bike", points: 18, reason: "Optional-feeling assistance" },
    { matches: preferences.electric === "Not necessary" && bike.id !== "e-bike", points: 15, reason: "Great without assistance" },
    { matches: preferences.height === "Under 160 cm" && bike.sizes.includes("S"), points: 8, reason: "Small frame available" },
    { matches: preferences.height === "181–190 cm" && bike.sizes.includes("L+"), points: 8, reason: "Tall rider size available" }
  ];
  const matches = rules.filter((rule) => rule.matches);
  return { bike, score: Math.min(matches.reduce((total, rule) => total + rule.points, 0), 100), reasons: matches.length ? Array.from(new Set(matches.map((rule) => rule.reason))) : ["A strong all-round match"] };
}
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
