export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.email || !body.password) return Response.json({ error: "Name, email and password are required" }, { status: 400 });
  return Response.json({ data: { name: body.name, email: body.email }, mode: "demo" }, { status: 201 });
}
