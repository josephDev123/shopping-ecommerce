"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParam = useSearchParams().get("status");

  return (
    <div className="flex gap-8  text-lg border-b">
      <Link
        href={"/order?status=pending"}
        className={`${
          searchParam === "pending" && "border-b-4 border-blue-600"
        }`}
      >
        Pending
      </Link>
      <Link
        href={"/order?status=confirmed"}
        className={`${
          searchParam === "confirmed" && "border-b-4 border-blue-600"
        }`}
      >
        Confirmed
      </Link>
      <Link
        href={"/order?status=processing"}
        className={`${
          searchParam === "processing" && "border-b-4 border-blue-600"
        }`}
      >
        Processing
      </Link>
      <Link
        href={"/order?status=picked"}
        className={`${
          searchParam === "picked" && "border-b-4 border-blue-600"
        }`}
      >
        Picked
      </Link>
      <Link
        href={"/order?status=shipped"}
        className={`${
          searchParam === "shipped" && "border-b-4 border-blue-600"
        }`}
      >
        Shipped
      </Link>
      <Link
        href={"/order?status=delivered"}
        className={`${
          searchParam === "delivered" && "border-b-4 border-blue-600"
        }`}
      >
        Delivered
      </Link>
      <Link
        href={"/order?status=cancelled"}
        className={`${
          searchParam === "cancelled" && "border-b-4 border-blue-600"
        }`}
      >
        Cancelled
      </Link>
    </div>
  );
}
