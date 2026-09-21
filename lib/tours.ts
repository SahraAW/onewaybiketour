export type Tour = {
  id: string;
  name: string;
  start: string;
  end: string;
  distance: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  description: string;
  highlights: string[];
};

export const tours: Tour[] = [
  {
    id: "coast-to-capital",
    name: "Coast to capital",
    start: "Helsingør",
    end: "Copenhagen",
    distance: "58 km",
    duration: "1 day",
    difficulty: "Easy",
    description: "A gentle seaside ride from the medieval coast into the heart of Copenhagen.",
    highlights: ["Louisiana Museum", "The Danish Riviera", "Coffee in Nørrebro"]
  },
  {
    id: "fjord-to-fjord",
    name: "Fjord to fjord",
    start: "Aarhus",
    end: "Silkeborg",
    distance: "72 km",
    duration: "2 days",
    difficulty: "Moderate",
    description: "Forest roads, quiet lakes and the soft rolling hills of central Jutland.",
    highlights: ["Moesgaard forest", "Himmelbjerget", "Lake Julsø"]
  },
  {
    id: "alps-to-adriatic",
    name: "Alps to Adriatic",
    start: "Innsbruck",
    end: "Bolzano",
    distance: "142 km",
    duration: "3 days",
    difficulty: "Challenging",
    description: "A cinematic descent through high mountain passes into northern Italy.",
    highlights: ["Brenner Pass", "South Tyrol vineyards", "Italian aperitivo"]
  }
];
