"use client";

import Link from "next/link";
import { INotification } from "../types/INotification";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

interface OrderNotificationCardProps {
  data: INotification;
}
export default function OrderNotificationCard({
  data,
}: OrderNotificationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  return (
    <div
      className={`${
        data.read ? "bg-white" : "bg-gray-100"
      } flex justify-between items-center border-b-2 pb-2 p-4`}
    >
      <div
        className={`flex flex-col ${data.read ? "bg-white" : "bg-gray-100"}`}
      >
        <h1 className="font-semibold text-sm  truncate text-nowrap">
          {data.label}
        </h1>
        <p className="text-sm text-gray-600">
          Order {data.metadata?.name} at the price of {data.metadata?.price}
        </p>
        {data.link && (
          <Link
            href={data.link}
            className="rounded-md self-end px-2 py-1 text-sm border border-blue-700 text-blue-700"
          >
            View Product
          </Link>
        )}
      </div>
      <div className="relative flex flex-col">
        <BsThreeDotsVertical
          onClick={() => {
            setIsOpen((prev) => !prev);
            setSelectedId(data._id);
          }}
          className="hover:bg-gray-300 text-2xl rounded-full  p-1 cursor-pointer"
        />
        {isOpen && selectedId === data._id && (
          <div className="absolute top-7 right-0 flex flex-col py-1 bg-gray-300 px-2 rounded-md">
            <button className="text-gray-500 text-sm">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
