"use client";

import { INotification } from "../types/INotification";
import { TbLoader2 } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import OrderNotificationCard from "./OrderNotificationCard";
import TransactionNotificationCard from "./TransactionNotificationCard";

type IStatus = "IsLoading" | "isError" | "data" | "idle";
interface NotificationProps {
  notification: INotification[];
  status: IStatus;
}

export default function Notification({
  notification,
  status,
}: NotificationProps) {
  return (
    <section className="absolute top-6 sm:right-1 -right-6 flex flex-col space-y-1 rounded-md sm:w-[400px] w-[300px] bg-white drop-shadow-md">
      {status === "IsLoading" ? (
        <div className="h-10 flex flex-col justify-center items-center">
          <TbLoader2 className="animate-spin text-lg" />
        </div>
      ) : status === "isError" ? (
        <div className="h-10 flex flex-col justify-center items-center">
          <small className="text-red-400">Something went wrong</small>
        </div>
      ) : notification.length === 0 ? (
        <div className="h-10 flex flex-col justify-center items-center">
          <small className="">No Notification</small>
        </div>
      ) : (
        <>
          {notification.map((notify) => (
            <div key={notify._id} className="flex flex-col">
              {notify.type === "Order" && (
                <OrderNotificationCard data={notify} />
              )}

              {notify.type === "Transaction" && (
                <TransactionNotificationCard data={notify} />
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
}
