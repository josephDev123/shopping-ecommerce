"use client";

import react from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleLeftPanel } from "@/app/slices/leftpanelSlice";
import { RootState } from "@/app/store";

export default function TopNavbar() {
  // const { data: session, status } = useSession();
  const dispatch = useDispatch();
  // console.log("top nav bar", session);
  const state = useSelector((state: any) => state);
  console.log(state.leftPanelState.value);

  return (
    <section className="w-full h-[10%] p-4 flex justify-between border-b-2 border-slate-300 items-center sticky top-0">
      <div className="flex sm:flex-row flex-col justify-between items-center sm:gap-2">
        <p className="sm:text-xl text-base font-bold self-center">
          {/* {session?.user?.name} */}
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
        <RxHamburgerMenu
          onClick={() => dispatch(toggleLeftPanel())}
          className="text-3xl hover:bg-gray-200 rounded-full p-1"
        />
      </div>
    </section>
  );
}
