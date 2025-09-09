"use server";

import { cookies } from "next/headers";

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
  const cookieStore = cookies(); // ✅ get user's cookies from the request
  console.log(cookieStore);
  const cookieHeader = cookieStore.toString();

  try {
    const response = await fetch(url, {
      headers: {
        Cookie: cookieHeader,
      },
      next: { revalidate },
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

function isSameOrigin(url: string) {
  try {
    const target = new URL(url);
    const base = new URL(process.env.ORIGIN ?? "http://localhost:3000");
    return target.origin === base.origin;
  } catch {
    return false;
  }
}
