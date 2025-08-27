"use client";

import Link from "next/link";
import { INotification } from "../types/INotification";
import { TbLoader2 } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

type IStatus = "IsLoading" | "isError" | "data" | "idle";
interface NotificationProps {
  notification: INotification[];
  status: IStatus;
}

export default function Notification({
  notification,
  status,
}: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  console.log(selectedId);
  return (
    <section className="absolute top-6 sm:right-1 -right-6 flex flex-col space-y-2 p-4 rounded-md sm:w-[500px] w-[300px] bg-white drop-shadow-md">
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
            <div className="flex justify-between items-center border-b-2 space-y-2 pb-2">
              <div key={notify._id} className="flex flex-col">
                <h1 className="font-semibold text-sm">{notify.label}</h1>

                {notify.metadata && (
                  <div className="text-gray-600 flex flex-col">
                    name: {notify.metadata.name} <br />
                    price: {notify.metadata.price}
                  </div>
                )}

                {notify.link && (
                  <Link
                    href={notify.link}
                    className="rounded-md px-2 py-1 text-sm border border-blue-700 text-blue-700"
                  >
                    View Product
                  </Link>
                )}
              </div>

              <div className="relative flex flex-col">
                <BsThreeDotsVertical
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                    setSelectedId(notify._id);
                  }}
                  className="hover:bg-gray-300 text-2xl rounded-full  p-1 cursor-pointer"
                />
                {isOpen && selectedId === notify._id && (
                  <div className="absolute top-7 right-0 flex flex-col py-1 bg-gray-300 px-2">
                    <button className="text-gray-500 text-sm">Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
