"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import SideBarCart from "../components/SideBarCart";
import { lazy, startTransition, Suspense, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNavBar from "./MobileNavBar";
import { useAppSelector } from "@/lib/slices/hooks";
// import SearchModal from "./SearchModal";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import Image from "next/image";
import AnimatePresenceWrapper from "./AnimatePresenceWrapper";
import { AnimatePresence } from "framer-motion";

const SearchModal = lazy(() => import("./SearchModal"));

export default function Navbar() {
  const { data, status } = useSession();

  const [isSideBarCartOpen, setSideBarCartOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleOpenSideCart = () => {
    setSideBarCartOpen(true);
  };

  const getCarts = useAppSelector((state) => state.cartState.carts);
  return (
    <section className="flex justify-between items-center py-6 w-full sm:px-6 px-1 border-b ">
      <Link href={"/"} className="">
        <Image
          src={"/png/logo.png"}
          alt="logo"
          width={60}
          height={60}
          // className="object-contain h-16 w-16"
        />
      </Link>

      <nav className="md:flex hidden justify-between lg:gap-10 gap-5 items-center text-lg">
        <Link href={"/"} className={`hover:text-gray-500 font-semibold `}>
          Home
        </Link>
        <Link href={"/shop"} className={`hover:text-gray-500 font-semibold `}>
          Shop
        </Link>
        <Link href={"/about"} className={`hover:text-gray-500 font-semibold `}>
          About
        </Link>
        <Link
          href={"/contact"}
          className={`hover:text-gray-500 font-semibold `}
        >
          Contact
        </Link>
      </nav>
      {/* md:gap-5 lg:gap-10 */}
      <nav className="flex gap-2 items-center text-3xl ">
        {/* {JSON.stringify(status)} */}
        {status === "loading" ? (
          <Loader className="h-5 w-5" />
        ) : status === "authenticated" ? (
          <Link
            href={"/dashboard"}
            className="text-base font-semibold hover:text-gray-600 px-1.5 py-0.5 rounded-md"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href={"/login"}
            type="button"
            className="text-base font-semibold"
          >
            login
          </Link>
        )}
        <FiSearch
          onClick={() =>
            startTransition(() => setIsSearchModalOpen((prev) => !prev))
          }
          className="hover:bg-slate-200 p-1 cursor-pointer rounded-full"
        />

        <FaRegUser className="hover:bg-slate-200 p-1 cursor-pointer rounded-full min-[425px]:block hidden" />
        <AiOutlineLike className="hover:bg-slate-200 p-1 cursor-pointer rounded-full min-[425px]:block hidden" />
        <span className="flex gap-1 relative">
          <span
            className="relative flex cursor-pointer"
            onClick={handleOpenSideCart}
          >
            <span
              className={`${
                getCarts.length > 0 && "animate-ping"
              }  absolute top-0.5 right-0.5 text-base  inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75 text-red-600`}
            >
              {getCarts.length > 0 ? getCarts.length : ""}
            </span>
            {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span> */}
            <MdOutlineShoppingCart className="hover:bg-slate-200 p-1   rounded-full" />
          </span>

          <RxHamburgerMenu
            onClick={() => setIsMobileNavbarOpen((prev) => !prev)}
            className="hover:bg-slate-200 p-1 cursor-pointer rounded-full md:hidden block"
          />

          <AnimatePresence>
            {isMobileNavbarOpen && (
              <MobileNavBar
                closeMobileNavBar={() => setIsMobileNavbarOpen(false)}
              />
            )}
          </AnimatePresence>
        </span>
      </nav>
      <AnimatePresence>
        {isSideBarCartOpen && (
          <SideBarCart closeSideBar={() => setSideBarCartOpen(false)} />
        )}
      </AnimatePresence>

      <Suspense fallback={<Loader className="h-5 w-5" />}>
        <SearchModal
          closeModal={() => setIsSearchModalOpen(false)}
          isOpen={isSearchModalOpen}
        />
      </Suspense>
    </section>
  );
}
