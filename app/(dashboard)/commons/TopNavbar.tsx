"use client";

import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useSession } from "next-auth/react";

export default function TopNavbar() {
  const { data: session, status } = useSession();
  // console.log("top nav bar", session);

  return (
    <section className="w-full h-[10%] p-4 flex justify-between border-b-2 border-slate-300 items-center sticky top-0">
      <div className="flex sm:flex-row flex-col justify-between items-center sm:gap-2">
        <p className="sm:text-xl text-base font-bold self-center">
          {session?.user?.name}
        </p>

        <span className="inline-flex sm:self-center items-center self-start text-xs text-slate-400">
          <MdOutlineKeyboardDoubleArrowRight className="text-slate-400" />
          May 5, 2024
        </span>
      </div>

      <div className="flex justify-between gap-4 items-center">
        <IoIosNotifications className="text-xl cursor-pointer" />
        <span className="relative sm:w-auto border rounded-md">
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search here ..."
            className="p-2  outline-none min-[425px]:w-auto w-24 sm:placeholder:text-inherit placeholder:text-sm "
          />
          <CiSearch className="absolute top-3 right-2 sm:text-xl text-sm" />
        </span>
      </div>
    </section>
  );
}
