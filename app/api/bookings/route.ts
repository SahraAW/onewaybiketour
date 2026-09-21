export async function POST(request: Request) {
  const body = await request.json();
  const reference = `OW-${Date.now().toString(36).toUpperCase()}`;
  return Response.json({ data: { reference, status: "test-pending", booking: body } }, { status: 201 });
}
