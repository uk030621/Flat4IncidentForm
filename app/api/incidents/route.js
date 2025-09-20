import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("incidentdb");
  const incidents = await db.collection("incidents").find().toArray();
  return new Response(JSON.stringify(incidents), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("incidentdb");
  const result = await db.collection("incidents").insertOne(body);
  return new Response(JSON.stringify(result), { status: 201 });
}
