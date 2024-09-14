"use client";

import { axiosInstance } from "@/app/axiosInstance";
import { Images } from "@/app/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type SuccessOrderProps = {
  queryParam: { status: string; tx_ref: string; transaction_id: string };
};
export default function SuccessOrder({ queryParam }: SuccessOrderProps) {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  async function verifyOrderSuccess() {
    setStatus("loading");
    try {
      const req = await axiosInstance({
        method: "get",
        url: "api/verify-order",
        params: {
          status: queryParam.status,
          tx_ref: queryParam.tx_ref,
          transaction_id: queryParam.transaction_id,
        },
      });
      const data = await req.data;
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  console.log(status, queryParam);

  useEffect(() => {
    verifyOrderSuccess();
  }, []);

  return (
    <>
      {status === "loading" ? (
        <div className="h-full w-full">Loading ...</div>
      ) : status === "error" ? (
        <div className="h-full w-full">Something went wrong</div>
      ) : status === "success" ? (
        <section className="p-6 grid lg:grid-cols-2 grid-cols-1 gap-6 2xl:w-[70%]  w-full mx-auto">
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-bold">Thank you for the purchase!</h2>
            <p>
              We sent a confirmation email at support@dddd.com. Below you wll
              find all information about your order.
            </p>
            <p>
              <strong>Note:</strong> Your order will be processed within 24hrs
              during working days. we will notify you by email once your order
              has been shipped.
            </p>

            <h1 className="text-xl font-bold">Billing Address</h1>
            <div className="w-full overflow-x-auto">
              <table className="table-fixed">
                <tr className="">
                  <td className="font-bold">Name</td>
                  <td className="px-4">Joe Doe</td>
                </tr>
                <tr>
                  <td className="font-bold">Address</td>
                  <td className="px-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Porro deleniti, illum fugit necessitatibus eaque
                    reprehenderit neque ab accusamus amet tempora non.
                    Reprehenderit, neque? Unde corporis officia quis assumenda
                    in. Aperiam!
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Phone</td>
                  <td className="px-4">+ 123 082338737</td>
                </tr>
                <tr>
                  <td className="font-bold">Email</td>
                  <td className="px-4">JoeDoe@gmail.com</td>
                </tr>
              </table>
            </div>

            <button
              type="button"
              className="p-3 rounded-full bg-red-400 hover:bg-red-500 font-medium text-white w-60"
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
                  <p className="font-semibold">02 may 2024</p>
                </div>
                <p className="bg-gray-500 w-full h-[0.5px] mb-3 sm:hidden block"></p>
                <div className="flex  flex-col leading-tight  p-3 sm:border-r-2  border-gray-500">
                  <h1 className="text-gray-700">Order Number</h1>
                  <p className="font-semibold">02-2867222828</p>
                </div>
                <p className="bg-gray-500 w-full h-[0.5px] mb-3 sm:hidden block"></p>
                <div className="flex  flex-col leading-tight  p-3 ">
                  <h1 className="text-gray-700">Payment Method</h1>
                  <p className="font-semibold">Mastercard</p>
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
                  <div className="relative block rounded-lg shadow-md size-28">
                    <Image src={Images.productCat1} alt="item" fill />
                  </div>
                  <div className="flex  flex-col">
                    <h2 className="font-semibold">One in one Chocolate</h2>
                    <small>Pack: medium</small>
                    <small>Qty: 1</small>
                  </div>
                </div>

                <strong>$50.00</strong>
              </div>
              <p className="bg-gray-500 w-full h-[0.5px] mb-3"></p>
              <div className="p-3 w-full">
                <table className="table-fixed w-full">
                  <tbody>
                    <tr className="flex justify-between">
                      <td>Sub Total</td>
                      <td>$100.00</td>
                    </tr>
                    <tr className="flex justify-between">
                      <td>Shipping</td>
                      <td>$10.00</td>
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
                <span className="text-xl font-bold">$1000.00</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
