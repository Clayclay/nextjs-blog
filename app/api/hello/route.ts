import { NextResponse } from "next/server";

export async function GET(request) { return NextResponse.json({ message: "Hello from Next.js" }, { status: 200 }); };