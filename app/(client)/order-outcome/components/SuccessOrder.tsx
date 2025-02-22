"use client";

import { transactionOutcomeType } from "@/app/types/transactionOutcomeType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function SuccessOrder({
  successTransaction,
}: {
  successTransaction: transactionOutcomeType;
}) {
  const [outcomeTransaction, setOutcomeTransaction] =
    useState<transactionOutcomeType>(successTransaction);

  return (
    <>
      <section className="p-6 grid lg:grid-cols-2 grid-cols-1 gap-6 2xl:w-[70%]  w-full mx-auto">
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold">Thank you for the purchase!</h2>
          <p>
            We sent a confirmation email at{" "}
            {outcomeTransaction?.customer?.email}. Below you wll find all
            information about your order.
          </p>
          <p>
            <strong>Note:</strong> Your order will be processed within 24hrs
            during working days. we will notify you by email once your order has
            been shipped.
          </p>

          <h1 className="text-xl font-bold">Billing Address</h1>
          <div className="w-full overflow-x-auto">
            <table className="table-fixed">
              <tr className="">
                <td className="font-bold">Name</td>
                <td className="px-4">{outcomeTransaction?.customer?.name}</td>
              </tr>
              <tr>
                <td className="font-bold">Address</td>
                <td className="px-4">
                  {outcomeTransaction?.customer?.address}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Phone</td>
                <td className="px-4">
                  {outcomeTransaction?.customer?.phonenumber}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Email</td>
                <td className="px-4">{outcomeTransaction?.customer?.email}</td>
              </tr>
            </table>
          </div>

          <button
            type="button"
            disabled
            className="p-3 rounded-full cursor-not-allowed bg-red-400 hover:bg-red-500 font-medium text-white w-60"
          >
            Track Your Order
          </button>
        </div>
        <div className="flex flex-col">
          <div className="rounded-full h-8 w-full bg-gray-300 translate-y-4 -z-10"></div>
          <div className="bg-gray-200 flex flex-col sm:w-[95%] mx-auto">
            <h2 className="text-2xl font-bold p-3">Order Summary</h2>
            <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
              <div className="flex  flex-col leading-tight  p-3 sm:border-r-2  border-gray-500">
                <h1 className="text-gray-700">Date</h1>
                <p className="font-semibold">
                  {moment(String(outcomeTransaction?.createdAt)).format(
                    "DD MMM YYYY"
                  )}
                </p>
              </div>
              <p className="bg-gray-500 w-full h-[0.5px] mb-3 sm:hidden block"></p>
              <div className="flex  flex-col leading-tight  p-3 sm:border-r-2  border-gray-500">
                <h1 className="text-gray-700">Order Number</h1>
                <p className="font-semibold break-words">
                  {outcomeTransaction?.tx_ref}
                </p>
              </div>
              <p className="bg-gray-500 w-full h-[0.5px] mb-3 sm:hidden block"></p>
              <div className="flex  flex-col leading-tight  p-3 ">
                <h1 className="text-gray-700">Payment Method</h1>
                <p className="font-semibold">""</p>
              </div>
            </div>

            <div className="flex items-center my-6 relative">
              <span className="rounded-full h-8 w-8 bg-white absolute -left-4"></span>{" "}
              <div className="w-full border border-dashed border-gray-600">
                {" "}
              </div>
              <span className="rounded-full h-8 w-8 bg-white absolute -right-4"></span>
            </div>
            <div className="flex justify-between p-3">
              <div className="flex min-[375px]:flex-row flex-col gap-3">
                <div className="relative block size-28">
                  {outcomeTransaction?.items?.[0]?.productImgUrl?.[0]?.url ? (
                    <Image
                      className="rounded-lg"
                      src={
                        outcomeTransaction.items[0].productImgUrl[0].url || ""
                      }
                      alt="item"
                      fill
                    />
                  ) : (
                    <span>No Image Available</span>
                  )}
                </div>
                <div className="flex  flex-col">
                  <h2 className="font-semibold">
                    {outcomeTransaction?.items[0]?.productName}
                  </h2>
                  <small>
                    Pack: {outcomeTransaction?.items[0]?.productItemWeight}
                  </small>
                  <small>Qty: {outcomeTransaction?.items[0]?.qty}</small>
                </div>
              </div>

              <strong>
                {outcomeTransaction?.payment?.currency}
                {outcomeTransaction?.payment?.amount}
              </strong>
            </div>
            <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>
            <div className="p-3 w-full">
              <table className="table-fixed w-full">
                <tbody>
                  <tr className="flex justify-between">
                    <td>Sub Total</td>
                    <td>
                      {outcomeTransaction?.payment?.currency}{" "}
                      {outcomeTransaction?.payment?.amount}
                    </td>
                  </tr>
                  <tr className="flex justify-between">
                    <td>Shipping</td>
                    <td>
                      {outcomeTransaction?.payment?.currency}{" "}
                      {outcomeTransaction?.payment?.amount}
                    </td>
                  </tr>
                  <tr className="flex justify-between">
                    <td>Tax</td>
                    <td>$5.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>

            <div className="p-3 flex items-center justify-between">
              <span className="text-xl font-bold">Order Total</span>{" "}
              <span className="text-xl font-bold">
                {outcomeTransaction?.payment?.currency}{" "}
                {outcomeTransaction?.payment?.amount}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
