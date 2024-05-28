import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex gap-4">
      <Link href={"pending"}>Pending</Link>
      <Link href={"pending"}>Confirmed</Link>
      <Link href={"pending"}>Processing</Link>
      <Link href={"pending"}>Picked</Link>
      <Link href={"pending"}>Shipped</Link>
      <Link href={"pending"}>Delivered</Link>
      <Link href={"pending"}>Cancelled</Link>
    </div>
  );
}
