"use client";

import { Images } from "@/app/Images";
import Image from "next/image";
import React from "react";

export default function SuccessOrder() {
  return (
    <section className="p-6 grid grid-cols-2 gap-6 2xl:w-[70%] sm:w-[80%] w-full mx-auto">
      <div className="flex flex-col space-y-6">
        <h2 className="text-4xl font-bold">Thank you for the purchase!</h2>
        <p>
          We sent a confirmation email at support@dddd.com. Below you wll find
          all information about your order.
        </p>
        <p>
          <strong>Note:</strong> Your order will be processed within 24hrs
          during working days. we will notify you by email once your order has
          been shipped.
        </p>

        <h1 className="text-xl font-bold">Billing Address</h1>
        <table>
          <tr>
            <td className="font-bold">Name</td>
            <td>Joe Doe</td>
          </tr>
          <tr>
            <td className="font-bold">Address</td>
            <td>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
              deleniti, illum fugit necessitatibus eaque reprehenderit neque ab
              accusamus amet tempora non. Reprehenderit, neque? Unde corporis
              officia quis assumenda in. Aperiam!
            </td>
          </tr>
          <tr>
            <td className="font-bold">Phone</td>
            <td>+ 123 082338737</td>
          </tr>
          <tr>
            <td className="font-bold">Email</td>
            <td>JoeDoe@gmail.com</td>
          </tr>
        </table>

        <button
          type="button"
          className="p-3 rounded-full bg-red-400 hover:bg-red-500 font-medium text-white w-60"
        >
          Track Your Order
        </button>
      </div>
      <div className="flex flex-col">
        <div className="rounded-full h-8 w-full bg-gray-300 translate-y-4 -z-10"></div>
        <div className="bg-gray-200 flex flex-col w-[95%] mx-auto">
          <h2 className="text-2xl font-bold p-3">Order Summary</h2>
          <p className="bg-gray-800 w-full h-[0.5px] mb-3"></p>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex  flex-col leading-tight  p-3 border-r-2 border-gray-500">
              <h1 className="text-gray-700">Date</h1>
              <p className="font-semibold">02 may 2024</p>
            </div>
            <div className="flex  flex-col leading-tight  p-3 border-r-2 border-gray-500">
              <h1 className="text-gray-700">Order Number</h1>
              <p className="font-semibold">02-2867222828</p>
            </div>

            <div className="flex  flex-col leading-tight  p-3 ">
              <h1 className="text-gray-700">Payment Method</h1>
              <p className="font-semibold">Mastercard</p>
            </div>
          </div>

          <div className="flex items-center my-6 relative">
            <span className="rounded-full h-8 w-8 bg-white absolute -left-4"></span>{" "}
            <div className="w-full border border-dashed border-gray-600"> </div>
            <span className="rounded-full h-8 w-8 bg-white absolute -right-4"></span>
          </div>
          <div className="flex justify-between p-3">
            <div className="flex gap-3">
              <div className="relative block rounded-lg">
                <Image
                  src={Images.productCat1}
                  alt="item"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex  flex-col">
                <h2 className="font-semibold">One in one Chocolate</h2>
                <small>Pack: medium</small>
                <small>Qty: 1</small>
              </div>
            </div>

            <strong>$50</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
