export async function GET(_: Request, { params }: { params: { id: string } }) {
  return Response.json({ data: { reference: params.id, status: "test-pending" } });
}
