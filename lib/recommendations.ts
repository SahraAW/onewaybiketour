import type { Tour } from "@/lib/tours";

export type TerrainPreference = "paved" | "gravel" | "hills";

export type TourPreferences = {
  terrain: TerrainPreference[];
  distance: "short" | "medium" | "long" | null;
  luggage: string | null;
  company: string | null;
};

export type TourRecommendation = {
  tour: Tour;
  score: number;
  reasons: string[];
};

export const defaultPreferences: TourPreferences = {
  terrain: [],
  distance: null,
  luggage: null,
  company: null
};

function distanceMatches(tour: Tour, preference: TourPreferences["distance"]): boolean {
  if (!preference) return false;
  if (preference === "short") return tour.distanceKm < 60;
  if (preference === "medium") return tour.distanceKm >= 60 && tour.distanceKm <= 100;
  return tour.distanceKm > 100;
}

export function calculateTourMatch(tour: Tour, preferences: TourPreferences): TourRecommendation {
  let score = 0;
  const reasons: string[] = [];

  for (const terrainPreference of preferences.terrain) {
    if (terrainPreference === "paved" && tour.terrain === "paved") { score += 40; reasons.push("Paved-road match"); }
    if (terrainPreference === "gravel" && (tour.terrain === "gravel" || tour.terrain === "mixed")) { score += 40; reasons.push("Gravel-road match"); }
    if (terrainPreference === "hills" && tour.hills !== "low") { score += 40; reasons.push("Hill-focused route"); }
  }
  if (distanceMatches(tour, preferences.distance)) { score += 25; reasons.push("Distance match"); }
  if (preferences.terrain.length === 0) score += 10;
  if (preferences.terrain.includes("hills") && tour.hills === "high") score += 10;
  if (!reasons.length) reasons.push("A strong all-round route");

  return { tour, score: Math.min(score, 100), reasons: Array.from(new Set(reasons)) };
}

export function getRecommendedTours(tours: Tour[], preferences: TourPreferences): TourRecommendation[] {
  return tours.map((tour) => calculateTourMatch(tour, preferences)).sort((a, b) => b.score - a.score);
}

function terrainFromAnswer(answer: string): TerrainPreference[] {
  if (answer.includes("paved")) return ["paved"];
  if (answer.includes("gravel")) return ["gravel"];
  if (answer.includes("hills")) return ["hills"];
  return [];
}

function distanceFromAnswer(answer: string): TourPreferences["distance"] {
  if (answer.includes("Less")) return "short";
  if (answer.includes("30") || answer.includes("60")) return "medium";
  if (answer.includes("90")) return "long";
  return null;
}

export function preferencesFromAnswers(answers: Record<number, string>): TourPreferences {
  return {
    terrain: terrainFromAnswer(answers[0] ?? ""),
    distance: distanceFromAnswer(answers[1] ?? ""),
    luggage: answers[2] ?? null,
    company: answers[3] ?? null
  };
}