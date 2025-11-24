"use client";

import { transactionOutcome } from "@/app/types/transactionOutcomeType";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function SuccessOrderDetails({
  successTransaction,
}: {
  successTransaction: transactionOutcome;
}) {
  const [outcomeTransaction, setOutcomeTransaction] =
    useState<transactionOutcome>(successTransaction);
  const navigate = useRouter();
  return (
    <>
      <section className="p-6 grid lg:grid-cols-2 grid-cols-1 gap-6 2xl:w-[70%]  w-full mx-auto">
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold">Thank you for the purchase!</h2>
          <p>
            We sent a confirmation email at{" "}
            {outcomeTransaction?.OrderDetails?.customer?.email}. Below you wll
            find all information about your OrderDetails.
          </p>
          <p>
            <strong>Note:</strong> Your OrderDetails will be processed within
            24hrs during working days. we will notify you by email once your
            OrderDetails has been shipped.
          </p>

          <h1 className="text-xl font-bold">Billing Address</h1>
          <div className="w-full overflow-x-auto">
            <table className="table-fixed">
              <tr className="">
                <td className="font-bold">Name</td>
                <td className="px-4">
                  {outcomeTransaction?.OrderDetails?.customer?.name}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Address</td>
                <td className="px-4">
                  {outcomeTransaction?.OrderDetails?.customer?.address}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Phone</td>
                <td className="px-4">
                  {outcomeTransaction?.OrderDetails?.customer?.phonenumber}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Email</td>
                <td className="px-4">
                  {outcomeTransaction?.OrderDetails?.customer?.email}
                </td>
              </tr>
            </table>
          </div>

          <button
            onClick={() => navigate.push("dashboard/shipping")}
            type="button"
            className="p-3 rounded-full  bg-red-400 hover:bg-red-500 font-medium text-white w-60"
          >
            Track Your Order Details
          </button>
        </div>
        <div className="flex flex-col">
          <div className="rounded-full h-8 w-full bg-gray-300 translate-y-4 -z-10"></div>
          <div className="bg-gray-200 flex flex-col sm:w-[95%] mx-auto">
            <h2 className="text-2xl font-bold p-3">OrderDetails Summary</h2>
            <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
              <div className="flex  flex-col leading-tight  p-3 sm:bOrderDetails-r-2  bOrderDetails-gray-500">
                <h1 className="text-gray-700">Date</h1>
                <p className="font-semibold">
                  {moment(
                    String(outcomeTransaction?.OrderDetails?.createdAt)
                  ).format("DD MMM YYYY")}
                </p>
              </div>
              <p className="bg-gray-500 w-full h-[0.5px] mb-3 sm:hidden block"></p>
              <div className="flex  flex-col leading-tight  p-3 sm:bOrderDetails-r-2  bOrderDetails-gray-500">
                <h1 className="text-gray-700">OrderDetails Number</h1>
                <p className="font-semibold break-words">
                  {outcomeTransaction?.OrderDetails?.tx_ref}
                </p>
              </div>
              <p className="bg-gray-500 w-full h-[0.5px] mb-3 sm:hidden block"></p>
              <div className="flex  flex-col leading-tight  p-3 ">
                <h1 className="text-gray-700">Payment Method</h1>
                <p className="font-semibold">
                  {outcomeTransaction.paymentDetails.payment_type}
                </p>
              </div>
            </div>

            <div className="flex items-center my-6 relative">
              <span className="rounded-full h-8 w-8 bg-white absolute -left-4"></span>{" "}
              <div className="w-full bOrderDetails bOrderDetails-dashed bOrderDetails-gray-600">
                {" "}
              </div>
              <span className="rounded-full h-8 w-8 bg-white absolute -right-4"></span>
            </div>
            <div className="flex justify-between p-3">
              <div className="flex min-[375px]:flex-row flex-col gap-3">
                <div className="relative block size-28">
                  {outcomeTransaction?.OrderDetails?.items?.[0]
                    ?.productImgUrl?.[0]?.url ? (
                    <Image
                      className="rounded-lg"
                      src={
                        outcomeTransaction?.OrderDetails?.items[0]
                          .productImgUrl[0].url || ""
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
                    {outcomeTransaction?.OrderDetails?.items[0]?.productName}
                  </h2>
                  <small>
                    Pack:{" "}
                    {
                      outcomeTransaction?.OrderDetails?.items[0]
                        ?.productItemWeight
                    }
                  </small>
                  <small>
                    Qty: {outcomeTransaction?.OrderDetails?.items[0]?.qty}
                  </small>
                </div>
              </div>

              <strong>
                {outcomeTransaction?.paymentDetails?.amount}
                {outcomeTransaction?.OrderDetails?.payment?.amount}
              </strong>
            </div>
            <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>
            <div className="p-3 w-full">
              <table className="table-fixed w-full">
                <tbody>
                  <tr className="flex justify-between">
                    <td>Sub Total</td>
                    <td>
                      {outcomeTransaction?.OrderDetails?.payment?.currency}{" "}
                      {outcomeTransaction?.paymentDetails?.amount}
                    </td>
                  </tr>
                  <tr className="flex justify-between">
                    <td>Shipping</td>
                    <td>
                      {outcomeTransaction?.OrderDetails?.billing?.currency}{" "}
                      {outcomeTransaction?.OrderDetails?.billing?.amount}
                    </td>
                  </tr>
                  {/* <tr className="flex justify-between">
                    <td>Tax</td>
                    <td>$5.00</td>
                  </tr> */}
                </tbody>
              </table>
            </div>

            <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>

            <div className="p-3 flex items-center justify-between">
              <span className="text-xl font-bold">OrderDetails Total</span>{" "}
              <span className="text-xl font-bold">
                {outcomeTransaction?.paymentDetails?.currency}
                {outcomeTransaction?.paymentDetails?.amount}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
