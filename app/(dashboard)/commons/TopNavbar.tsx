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
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import { INotification } from "../types/INotification";
import { toast } from "react-toastify";

type IStatus = "IsLoading" | "isError" | "data" | "idle";
export default function TopNavbar() {
  const { data: session, status } = useSession();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notification, setNotification] = useState<INotification[]>([]);
  const [NotificationStatus, setNotificationStatus] = useState<IStatus>("idle");

  // console.log("top nav bar", session);
  const state = useAppSelector((state) => state.leftPanelState);
  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  useEffect(() => {
    async function getNotification() {
      if (!session) return;
      setNotificationStatus("IsLoading");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/notification?user_id=${session?.user.id}&limit=10&page=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-cache",
          }
        );
        const result = await response.json();
        if (!response.ok) {
          setNotificationStatus("isError");
          toast.error(result.msg || "Something went wrong");
          throw new Error(result.msg);
        }
        setNotificationStatus("data");
        setNotification(result.data);
        // console.log(result);
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          setNotificationStatus("isError");
          console.log(err.message);
          toast.error(err.message || "Something went wrong");
        }
      }
    }
    getNotification();
    // const id = setInterval(() => getNotification(), 20000);
    // return () => clearInterval(id);
  }, [session?.user.id]);

  return (
    <section className="w-full h-[10%] sm:p-4 p-2 flex justify-between border-b border-slate-300 items-center sticky z-50 top-0">
      <div className="flex sm:flex-row flex-col justify-between items-center sm:gap-2">
        <p className="sm:text-xl sm:w-40 w-28 text-base font-bold self-center text-ellipsis truncate text-nowrap">
          {status === "loading" ? (
            <Loader className="h-5 w-5 animate-spin" />
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
        <Link
          href="/"
          className="font-semibold text-green-500 hover:text-green-400"
        >
          Home
        </Link>
        <div className="flex flex-col relative">
          <IoIosNotifications
            className="text-xl cursor-pointer"
            onClick={toggleNotification}
          />
          {isNotificationOpen && (
            <Notification
              notification={notification}
              status={NotificationStatus}
            />
          )}
        </div>

        <HamburgerToggle />
      </div>
      <AnimatePresence>
        <DashboardMobileLeftpanel />
      </AnimatePresence>
    </section>
  );
}
