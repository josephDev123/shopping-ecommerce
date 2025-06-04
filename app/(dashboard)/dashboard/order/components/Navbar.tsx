import Link from "next/link";

interface OrderPageNavProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Navbar({ searchParams }: OrderPageNavProps) {
  return (
    <div className="flex sm:gap-8 gap-4 border-b  overflow-x-auto mb-2 ">
      <Link
        href={"/dashboard/order?status=pending"}
        className={`${
          searchParams.status === "pending" && "border-b-4 border-blue-600"
        }`}
      >
        Pending
      </Link>
      <Link
        href={"/dashboard/order?status=confirmed"} //confirmed
        className={`${
          searchParams.status === "confirmed" && "border-b-4 border-blue-600"
        }`}
      >
        Confirmed
      </Link>
      <Link
        href={"/dashboard/order?status=processing"}
        className={`${
          searchParams.status === "processing" && "border-b-4 border-blue-600"
        }`}
      >
        Processing
      </Link>
      <Link
        href={"/dashboard/order?status=picked"}
        className={`${
          searchParams.status === "picked" && "border-b-4 border-blue-600"
        }`}
      >
        Picked
      </Link>
      <Link
        href={"/dashboard/order?status=shipped"}
        className={`${
          searchParams.status === "shipped" && "border-b-4 border-blue-600"
        }`}
      >
        Shipped
      </Link>
      <Link
        href={"/dashboard/order?status=delivered"}
        className={`${
          searchParams.status === "delivered" && "border-b-4 border-blue-600"
        }`}
      >
        Delivered
      </Link>
      <Link
        href={"/dashboard/order?status=cancelled"}
        className={`${
          searchParams.status === "cancelled" && "border-b-4 border-blue-600"
        }`}
      >
        Cancelled
      </Link>
    </div>
  );
}
