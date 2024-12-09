import { NextResponse } from "next/server";

export function POST(req: Request) {
  const body = req.body;
  console.log(body);
  return NextResponse.json({ body });
}
