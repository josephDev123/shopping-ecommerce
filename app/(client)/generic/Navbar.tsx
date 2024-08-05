"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import SideBarCart from "../components/SideBarCart";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNavBar from "./MobileNavBar";

export default function Navbar() {
  const [isSideBarCartOpen, setSideBarCartOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const pathname = usePathname();
  const handleOpenSideCart = () => {
    setSideBarCartOpen(true);
  };
  return (
    <section className="flex justify-between items-center py-6 w-full sm:px-6 px-1">
      <Link href={"/"} className="text-lg font-semibold">
        Ecommerce
      </Link>

      <nav className="md:flex hidden justify-between lg:gap-10 gap-5 items-center text-lg">
        <Link href={"/"} className={`hover:text-gray-500 font-semibold `}>
          Home
        </Link>
        <Link href={"/shop"} className={`hover:text-gray-500 font-semibold `}>
          Shop
        </Link>
        <Link href={""} className={`hover:text-gray-500 font-semibold `}>
          About
        </Link>
        <Link
          href={"/contact"}
          className={`hover:text-gray-500 font-semibold `}
        >
          Contact
        </Link>
      </nav>

      <nav className="flex gap-2 md:gap-5 lg:gap-10 text-3xl ">
        <div className="flex relative group">
          <input
            type="search"
            name=""
            id=""
            className="group-hover:border outline-none w-10 group-hover:w-36"
          />
          <FiSearch className="hover:bg-slate-200 p-1 cursor-pointer rounded-full absolute top-1 left-1 group-hover:hidden" />
        </div>

        <FaRegUser className="hover:bg-slate-200 p-1 cursor-pointer rounded-full min-[425px]:block hidden" />
        <AiOutlineLike className="hover:bg-slate-200 p-1 cursor-pointer rounded-full min-[425px]:block hidden" />
        <span className="flex gap-1 relative">
          <RxHamburgerMenu
            onClick={() => setIsMobileNavbarOpen((prev) => !prev)}
            className="hover:bg-slate-200 p-1 cursor-pointer rounded-full md:hidden block"
          />
          <MdOutlineShoppingCart
            onClick={handleOpenSideCart}
            className="hover:bg-slate-200 p-1 cursor-pointer rounded-full"
          />

          {isMobileNavbarOpen && (
            <MobileNavBar
              closeMobileNavBar={() => setIsMobileNavbarOpen(false)}
            />
          )}
        </span>
      </nav>
      {isSideBarCartOpen && (
        <SideBarCart closeSideBar={() => setSideBarCartOpen(false)} />
      )}
    </section>
  );
}
