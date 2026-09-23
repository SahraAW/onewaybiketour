import { tours } from "@/lib/tours";

export function GET() {
  return Response.json({ data: tours });
}
