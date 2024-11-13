"use client";

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useSession } from "next-auth/react";
import {
  useAppSelector,
  useAppDispatch,
  useAppStore,
} from "@/lib/slices/hooks";
import { toggleLeftPanel } from "@/lib/slices/leftpanelSlice";
import HamburgerToggle from "./HamburgerToggle";
import DashboardMobileLeftpanel from "./DashboardMobileLeftpanel";
import moment from "moment";
import Loader from "@/app/(client)/components/Loader";

export default function TopNavbar() {
  const { data: session, status } = useSession();

  // console.log("top nav bar", session);
  const state = useAppSelector((state) => state.leftPanelState);

  return (
    <section className="w-full h-[10%] sm:p-4 p-2 flex justify-between border-b-2 border-slate-300 items-center sticky top-0">
      <div className="flex sm:flex-row flex-col justify-between items-center sm:gap-2">
        <p className="sm:text-xl sm:w-40 w-28 text-base font-bold self-center text-ellipsis truncate text-nowrap">
          {status === "loading" ? (
            <Loader className="h-5 w-5" />
          ) : (
            <>{session?.user?.name}</>
          )}
        </p>

        <span className="inline-flex sm:self-center items-center self-start text-xs text-slate-400">
          <MdOutlineKeyboardDoubleArrowRight className="text-slate-400" />
          {moment(new Date()).format("DD, MMM YYYY")}
        </span>
      </div>

      <div className="flex  justify-between sm:gap-4 gap-2 items-center">
        <IoIosNotifications className="text-xl cursor-pointer" />
        <span className="relative sm:w-auto border rounded-md">
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search here ..."
            className="sm:p-2 p-1 outline-none sm:w-72 w-32 sm:placeholder:text-inherit placeholder:text-sm "
          />
          <CiSearch className="absolute top-3 right-2 sm:text-xl text-sm" />
        </span>
        <HamburgerToggle />
      </div>
      <DashboardMobileLeftpanel />
    </section>
  );
}
