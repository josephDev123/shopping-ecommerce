"use client";

import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface MobileNavBarType {
  closeMobileNavBar: () => void;
}

export default function MobileNavBar({ closeMobileNavBar }: MobileNavBarType) {
  return (
    <section className="absolute top-9 right-0 flex flex-col w-[200px] space-y-2 p-2 drop-shadow-md rounded-md bg-white">
      <nav className="flex flex-col justify-between gap-2 text-lg">
        <Link
          onClick={() => closeMobileNavBar()}
          href={"/"}
          className={`hover:text-gray-500 font-semibold `}
        >
          Home
        </Link>
        <Link
          onClick={() => closeMobileNavBar()}
          href={"/shop"}
          className={`hover:text-gray-500 font-semibold `}
        >
          Shop
        </Link>
        <Link
          onClick={() => closeMobileNavBar()}
          href={""}
          className={`hover:text-gray-500 font-semibold `}
        >
          About
        </Link>
        <Link
          onClick={() => closeMobileNavBar()}
          href={"/contact"}
          className={`hover:text-gray-500 font-semibold `}
        >
          Contact
        </Link>
      </nav>
    </section>
  );
}
