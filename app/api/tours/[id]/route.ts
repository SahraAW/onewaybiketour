import { getTour } from "@/lib/booking";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const tour = getTour(params.id);
  if (!tour) return Response.json({ error: "Tour not found" }, { status: 404 });
  return Response.json({ data: tour });
}
