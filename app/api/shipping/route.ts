import { NextRequest, NextResponse } from "next/server";

async function createShippingHandler(req: NextRequest) {
  //   const body = await req.json();

  return NextResponse.json({ msg: "Shipping created" }, { status: 200 });
}

export const POST = createShippingHandler;
