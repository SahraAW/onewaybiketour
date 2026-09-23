import { getAvailableDates } from "@/lib/booking";

export function GET() {
  return Response.json({ data: getAvailableDates() });
}
