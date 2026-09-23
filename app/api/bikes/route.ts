import { bikes } from "@/lib/booking";

export function GET() {
  return Response.json({ data: bikes.map((bike) => ({ ...bike, available: true })) });
}
