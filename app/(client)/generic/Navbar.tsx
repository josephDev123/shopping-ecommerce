"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <section className="flex justify-around items-center py-6">
      <Link href={"/"} className="text-lg font-semibold">
        Ecommerce
      </Link>
      <nav className="flex justify-between gap-10 items-center  text-lg">
        <Link href={""} className={`hover:text-gray-500 font-semibold `}>
          Home
        </Link>
        <Link href={"/shop"} className={`hover:text-gray-500 font-semibold `}>
          Shop
        </Link>
        <Link href={""} className={`hover:text-gray-500 font-semibold `}>
          About
        </Link>
        <Link href={""} className={`hover:text-gray-500 font-semibold `}>
          Contact
        </Link>
      </nav>

      <nav className="flex justify-between gap-10 text-3xl">
        <FaRegUser className="hover:bg-slate-200 p-1 cursor-pointer rounded-full" />
        <FiSearch className="hover:bg-slate-200 p-1 cursor-pointer rounded-full" />
        <AiOutlineLike className="hover:bg-slate-200 p-1 cursor-pointer rounded-full" />
        <MdOutlineShoppingCart className="hover:bg-slate-200 p-1 cursor-pointer rounded-full" />
      </nav>
    </section>
  );
}
