export async function POST(request: Request) {
  const body = await request.json();
  if (!body.email || !body.password) return Response.json({ error: "Email and password are required" }, { status: 400 });
  return Response.json({ data: { email: body.email }, mode: "demo" });
}
