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
  const [terrainPreference] = preferences.terrain;

  if (terrainPreference === "paved" && tour.terrain === "paved") { score += 40; reasons.push("Paved-road match"); }
  if (terrainPreference === "gravel" && (tour.terrain === "gravel" || tour.terrain === "mixed")) { score += 40; reasons.push("Gravel-road match"); }
  if (terrainPreference === "hills" && tour.hills !== "low") { score += 40; reasons.push("Hill-focused route"); }
  if (distanceMatches(tour, preferences.distance)) { score += 25; reasons.push("Distance match"); }
  if (preferences.terrain.length === 0) score += 10;
  if (preferences.terrain.includes("hills") && tour.hills === "high") score += 10;
  if (!reasons.length) reasons.push("A strong all-round route");

  return { tour, score, reasons };
}

export function getRecommendedTours(tours: Tour[], preferences: TourPreferences): TourRecommendation[] {
  return tours.map((tour) => calculateTourMatch(tour, preferences)).sort((a, b) => b.score - a.score);
}

export function preferencesFromAnswers(answers: Record<number, string>): TourPreferences {
  const terrainAnswer = answers[0] ?? "";
  const distanceAnswer = answers[1] ?? "";
  return {
    terrain: terrainAnswer.includes("paved") ? ["paved"] : terrainAnswer.includes("gravel") ? ["gravel"] : terrainAnswer.includes("hills") ? ["hills"] : [],
    distance: distanceAnswer.includes("Less") ? "short" : distanceAnswer.includes("30") || distanceAnswer.includes("60") ? "medium" : distanceAnswer.includes("90") ? "long" : null,
    luggage: answers[2] ?? null,
    company: answers[3] ?? null
  };
}