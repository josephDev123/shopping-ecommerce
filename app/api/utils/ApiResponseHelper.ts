import { NextResponse } from "next/server";

export function ApiResponseHelper(
  msg: string,
  name: string,
  operational: boolean,
  type: string,
  status: number
) {
  return NextResponse.json(
    {
      msg: msg,
      name: name,
      operational: operational,
      type: type,
    },
    { status: status }
  );
}
