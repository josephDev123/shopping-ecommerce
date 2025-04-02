"use client";

import Link from "next/link";
// import { AiOutlineLike } from "react-icons/ai";
// import { FaRegUser } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";
import { motion } from "motion/react";

interface MobileNavBarType {
  closeMobileNavBar: () => void;
}

export default function MobileNavBar({ closeMobileNavBar }: MobileNavBarType) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-9 right-0 flex flex-col w-[200px] space-y-2 p-2 drop-shadow-md rounded-md bg-white"
    >
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
          href={"/about"}
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
    </motion.section>
  );
}
