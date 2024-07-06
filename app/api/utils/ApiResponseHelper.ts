import { NextResponse } from "next/server";

export async function ApiResponseHelper(
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

export async function SuccessApiResponseHelper<T>(
  msg: string,
  name: string,
  operational: boolean,
  type: string,
  status: number,
  data: T[] | T,
  additionalData?: any
) {
  return NextResponse.json(
    {
      msg: msg,
      name: name,
      operational: operational,
      type: type,
      data: data,
      additionalData: additionalData,
    },
    { status: status }
  );
}
