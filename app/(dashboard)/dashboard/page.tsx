import React from "react";
import TransactionStat from "./indexComponent/TransactionStat";
import LineChart, { LineChartsMultiple } from "./commonComponents/LineChart";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ResponsiveContainer } from "recharts";

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

      <div className="grid grid-cols-2 gap-8 mt-10 h-[350px]">
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
            <div className="flex flex-col justify-center  items-center bg-[#0FB7FF] h-36 w-36 rounded-full absolute left-32 -bottom-14">
              <h3 className="text-gray-200">Fashion</h3>
              <h1 className="text-xl font-bold text-white">4.567</h1>
              <p className="text-gray-200">Per Day</p>
            </div>
            <div className="flex flex-col justify-center  items-center bg-[#1EB564] h-32 w-32 rounded-full absolute left-5 -bottom-20">
              <h3 className="text-gray-200">Fashion</h3>
              <h1 className="text-xl font-bold text-white">4.567</h1>
              <p className="text-gray-200">Per Day</p>
            </div>
          </div>
        </div>

        {/* second grid */}
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <h1>Last Transactions</h1>
            <button type="button" className="text-[#0F60FF]">
              View All
            </button>
          </div>
          <table className="mt-4">
            <thead className="bg-gray-100 ">
              <tr className="text-left p-4 border-b">
                <th>ID</th>
                <th>Issued Date</th>
                <th>Total</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="">
                <td className="">#5089</td>
                <td className="">31 March 2023</td>
                <td className="">$1200</td>
                <td className="text-[#0F60FF]">
                  {" "}
                  <button type="button" className="text-[#0F60FF]">
                    View Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>#5089</td>
                <td>31 March 2023</td>
                <td>$1200</td>
                {/* <td className="text-[#0F60FF]">View Detail</td> */}
                <button type="button" className="text-[#0F60FF]">
                  View Detail
                </button>
              </tr>
              <tr>
                <td>#5089</td>
                <td>31 March 2023</td>
                <td>$1200</td>
                {/* <td className="text-[#0F60FF]">View Detail</td> */}
                <button type="button" className="text-[#0F60FF]">
                  View Detail
                </button>
              </tr>
              <tr>
                <td>#5089</td>
                <td>31 March 2023</td>
                <td>$1200</td>
                {/* <td className="text-[#0F60FF]">View Detail</td> */}
                <button type="button" className="text-[#0F60FF]">
                  View Detail
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">
        {/* first grid */}
        <div className="flex flex-col w-full mt-4">
          <h1 className="font-bold">Best Selling Products</h1>

          <table className="mt-4">
            <thead className="bg-gray-100 text-[#8B909A]">
              <tr className="text-left p-4 border-b">
                <th>Product</th>
                <th>Total Order</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="">
                <td className="">Apple iPhone 13</td>
                <td className="">506</td>
                <td className="">Stock</td>
                <td className="text-[#0F60FF]">$999.29</td>
              </tr>
              <tr className="">
                <td className="">Apple iPhone 13</td>
                <td className="">506</td>
                <td className="">Out</td>
                <td className="text-[#0F60FF]">$999.29</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* second grid */}
        <div className="flex flex-col ">
          <h1 className="font-bold">Trending Products</h1>
          <p className="text-sm text-gray-400">Total 10.4k Visitors</p>
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-sm">Apple iPhone 13</h2>
              <p className="text-sm">Item: #FXZ-4567</p>
            </div>
            <p>$999.29</p>
          </div>

          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-sm">Apple iPhone 13</h2>
              <p className="text-sm">Item: #FXZ-4567</p>
            </div>
            <p>$999.29</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">
        <div className="flex flex-col">
          <h1 className="font-bold">Today Order</h1>
          <p className="text-xl mt-3 font-bold">16.5K</p>
          <p className="text-xs my-4">Orders Over Time</p>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <LineChartsMultiple />
          {/* </ResponsiveContainer> */}
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold">Recent Orders</h2>
          <table className="mt-8">
            <thead className="bg-[#DBDADE] ">
              <tr className="text-left">
                <th>ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#6548</td>
                <td>Joseph Wheeler</td>
                <td>Pending</td>
                <td>$999.29</td>
              </tr>
              <tr>
                <td>#6548</td>
                <td>Joseph Wheeler</td>
                <td>Pending</td>
                <td>$999.29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
