export type Tour = {
  id: string;
  name: string;
  start: string;
  end: string;
  distance: string;
  distanceKm: number;
  duration: string;
  price: number;
  image: string;
  terrain: "paved" | "gravel" | "mixed";
  hills: "low" | "medium" | "high";
  difficulty: "Easy" | "Moderate" | "Challenging";
  description: string;
  included: string[];
  highlights: string[];
};

export const tours: Tour[] = [
  {
    id: "coast-to-capital",
    name: "Coast to capital",
    start: "Helsingør",
    end: "Copenhagen",
    distance: "58 km",
    distanceKm: 58,
    duration: "1 day",
    price: 89,
    image: "/tours-pic/coast-to-capital.webp",
    terrain: "paved",
    hills: "low",
    difficulty: "Easy",
    description: "A gentle seaside ride from the medieval coast into the heart of Copenhagen.",
    included: ["Route planning", "Luggage guidance", "Local recommendations"],
    highlights: ["Louisiana Museum", "The Danish Riviera", "Coffee in Nørrebro"]
  },
  {
    id: "fjord-to-fjord",
    name: "Fjord to fjord",
    start: "Aarhus",
    end: "Silkeborg",
    distance: "72 km",
    distanceKm: 72,
    duration: "2 days",
    price: 145,
    image: "/tours-pic/fjord-to-fjord.webp",
    terrain: "mixed",
    hills: "medium",
    difficulty: "Moderate",
    description: "Forest roads, quiet lakes and the soft rolling hills of central Jutland.",
    included: ["Two-day route plan", "Accommodation suggestions", "Luggage guidance"],
    highlights: ["Moesgaard forest", "Himmelbjerget", "Lake Julsø"]
  },
  {
    id: "alps-to-adriatic",
    name: "Alps to Adriatic",
    start: "Innsbruck",
    end: "Bolzano",
    distance: "142 km",
    distanceKm: 142,
    duration: "3 days",
    price: 220,
    image: "/tours-pic/alps-to-adriatic.webp",
    terrain: "paved",
    hills: "high",
    difficulty: "Challenging",
    description: "A cinematic descent through high mountain passes into northern Italy.",
    included: ["Mountain route plan", "Safety briefing", "Refuel stops"],
    highlights: ["Brenner Pass", "South Tyrol vineyards", "Italian aperitivo"]
  }
];
