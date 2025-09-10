"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type revalidate = number | undefined;
type Cache = RequestCache | undefined;

type CustomFetchOptions = {
  url: string;
  revalidate?: number;
  //   cache?: RequestCache;
};
export async function CustomFetch({
  url,
  revalidate,
}: //   cache = "force-cache",
CustomFetchOptions) {
  const isOrigin = isSameOrigin();
  if (!isOrigin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const cookieStore = cookies(); // ✅ get user's cookies from the request

  const cookieHeader = cookieStore.toString();
  // console.log("coookie string", cookieStore);

  try {
    const response = await fetch(url, {
      headers: {
        Cookie: cookieHeader,
      },
      next: { revalidate },
      // credentials: "include",
      //   cache: cache,
    });

    const parseResult = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return parseResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("something went wrong");
  }
}

function isSameOrigin() {
  try {
    const header = headers();
    const host = header.get("host");

    const protocol = header.get("x-forwarded-proto");
    // console.log(host, protocol);
    const target = new URL(`${protocol}://${host}`);

    const base = new URL(process.env.ORIGIN ?? "http://localhost:3000");

    return target.origin === base.origin;
  } catch {
    return false;
  }
}
