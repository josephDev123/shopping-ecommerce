"use server";

import { ShippingsApiResponse } from "../type/ApiShipping";
import { cookies } from "next/headers";

export async function getShip() {
  const cookie = cookies();
  try {
    const response = await fetch(`${process.env.SERVER_BASEURL}/api/shipping`, {
      headers: {
        cookie: cookie.toString(),
      },
      next: { revalidate: 60 * 5, tags: ["shipping"] },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return (await response.json()) as ShippingsApiResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unknown error");
  }
}
