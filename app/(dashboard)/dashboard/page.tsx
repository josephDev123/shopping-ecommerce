import React from "react";
import TransactionStat from "./indexComponent/TransactionStat";
import LineChart, { LineChartsMultiple } from "./commonComponents/LineChart";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Page() {
  return (
    <section className="flex flex-col p-3 w-full">
      <div className="grid grid-cols-4 gap-4 w-full">
        <TransactionStat />
        <div className="w-fit">
          <LineChart />
        </div>
        <TransactionStat />
        <div className="w-fit ">
          <LineChart />
        </div>

        <TransactionStat />
        <div className="w-fit">
          <LineChart />
        </div>
        <TransactionStat />
        <div className="w-fit ">
          <LineChart />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {/* first grid */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <h1>Reports</h1>
            <p className="text-xs">Last 7 Days</p>
          </div>
          <div className="flex mt-8 justify-between">
            <div className="flex flex-col hover:cursor-pointer">
              <h1 className="font-bold text-xl">24k</h1>
              <p className="text-xs">Customers</p>
            </div>

            <div className="flex flex-col hover:cursor-pointer">
              <h1 className="font-bold text-xl">3.5k</h1>
              <p className="text-xs">Total Products</p>
            </div>

            <div className="flex flex-col hover:cursor-pointer">
              <h1 className="font-bold text-xl">2.5k</h1>
              <p className="text-xs">Stock Products</p>
            </div>

            <div className="flex flex-col hover:cursor-pointer">
              <h1 className="font-bold text-xl">0.5k</h1>
              <p className="text-xs">Out of Stock</p>
            </div>
            <div className="flex flex-col hover:cursor-pointer">
              <h1 className="font-bold text-xl">250k</h1>
              <p className="text-xs">Revenue</p>
            </div>
          </div>
          <div className="mt-4">
            <LineChartsMultiple />
          </div>
        </div>

        {/* second grid */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <h1 className="font-bold text-base">Users in last 30 minutes</h1>
          </div>

          <div className="flex flex-col hover:cursor-pointer mt-4">
            <h1 className="font-bold text-xl">24k</h1>
            <p className="text-xs">Customers</p>
          </div>

          <div className="mt-4">
            <LineChartsMultiple />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">
        {/* first grid */}
        <div className="flex  flex-col ">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">Top Selling Category</h1>
            <BsThreeDotsVertical className="hover:bg-gray-200 rounded-full p-1 text-xl cursor-pointer" />
          </div>
          <p className="text-sm">Total 10.4k Visitors</p>
          <div className="relative mt-6">
            <div className="flex flex-col justify-center  items-center bg-[#0F60FF] h-48 w-48 rounded-full">
              <h3 className="text-gray-200">Fashion</h3>
              <h1 className="text-xl font-bold text-white">4.567</h1>
              <p className="text-gray-200">Per Day</p>
            </div>
            <div className="bg-[#0FB7FF] h-36 w-36 rounded-full absolute left-32 -bottom-14"></div>
            <div className="bg-[#1EB564] h-32 w-32 rounded-full absolute left-5 -bottom-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
