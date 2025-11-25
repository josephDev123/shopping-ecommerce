"use server";

import { IShipping } from "@/app/api/shipping/zod/ShippingSchema";

export async function getShip() {
  try {
    const response = await fetch(`${process.env.SERVER_BASEURL}/api/shipping`, {
      next: { revalidate: 60 * 5, tags: ["shipping"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch shipping data");
    }

    return (await response.json()) as IShipping[];
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Error in Shipping: ${errorMessage}`);
  }
}
