import React from "react";
import SummaryCard from "./indexComponent/SummaryCard";
import DoughnutChart from "./indexComponent/Doughnut";
import BarChart from "./indexComponent/BarChart";
import customerNames from "./data/customer";
import BarLabel from "./indexComponent/BarLabel";
import { OverviewResponse } from "@/app/types/overvieResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { abbreviateNumber } from "@/app/utils/abbreviateNumber";
import Image from "next/image";
import moment from "moment";
import { CustomFetch } from "@/app/serverActions/customFetch";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const progress = 50;

  const overview = await CustomFetch({
    url: `${process.env.SERVER_BASEURL}/api/overview?user_id=${session?.user.id}`,
  });

  const parseResult = overview;
  const result: OverviewResponse = parseResult;
  const totalOrderParse = abbreviateNumber(result.totalOrders) || 0;
  const totalOrderPercent = Math.min(result.totalOrders, 100);
  const totalSuccessTransaction = result.transactionCountResult.success;
  const totalPendingTransaction = result.transactionCountResult.pending;
  const transactionSuccessPercent = Math.min(
    (totalSuccessTransaction / 100) * 100,
    100
  );

  const transactionPendingPercent = Math.min(
    (totalPendingTransaction / 100) * 100,
    100
  );

  const latestCustomer = result.latestCustomers.map(
    (item) => item.customer.name
  );
  const barData = result.latestCustomers.map((item, i) => 30);

  const MostOrderedCategories = result.mostBoughtCategories || [];

  const latestOrders = result.latestOrders || [];

  return (
    <section className="flex flex-col h-full p-3  w-full">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* <pre>{JSON.stringify(transactionPercent, null, 2)}</pre> */}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-3">
        <SummaryCard
          figure={totalOrderParse}
          title="Total Product"
          description="Total Product purchased"
        >
          <div className="w-full h-32">
            <DoughnutChart
              value={totalOrderPercent}
              maxValue={100}
              labelsData={["Total Product"]}
              backgroundColors={["#4CAF50", "#E0E0E0"]}
            />
          </div>
        </SummaryCard>

        <SummaryCard
          figure={totalPendingTransaction}
          title="Pending"
          description="Pending Transaction"
        >
          <div className="w-full h-32">
            <DoughnutChart
              value={transactionPendingPercent}
              maxValue={100}
              labelsData={["Pending"]}
              backgroundColors={["#0000FF", "#E0E0E0"]}
            />
          </div>
        </SummaryCard>

        <SummaryCard
          figure={totalSuccessTransaction}
          title="Success"
          description="Successful Transaction"
        >
          <div className="w-full h-32">
            <DoughnutChart
              value={transactionSuccessPercent}
              maxValue={100}
              labelsData={["Successful"]}
              backgroundColors={["#FFA500", "#E0E0E0"]}
            />
          </div>
        </SummaryCard>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-4 sm:space-y-0 space-y-3 mt-3">
        <div className="flex flex-col col-span-2 w-full p-2 bg-black text-white rounded-md overflow-x-auto">
          <h1 className="font-medium text-white/70  sm:text-base text-sm mb-3">
            latest Customer purchased for
          </h1>
          <BarChart
            labels={latestCustomer}
            data={barData}
            ShowLegends={false}
          />
        </div>
        <div className="flex flex-col col-span-1 w-full p-2  bg-black text-white rounded-md overflow-x-auto">
          <h1 className="font-medium text-white/70 sm:text-base text-sm">
            Most Category bought
          </h1>
          <div className="flex flex-col mt-3 space-y-2">
            {MostOrderedCategories.length <= 0 ? (
              <span className="text-center">No latest order category</span>
            ) : (
              MostOrderedCategories.map((category, i) => (
                <BarLabel
                  key={i}
                  value={category.count}
                  className=""
                  label={category._id}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-3 p-2">
        <h1 className="font-bold text-lg">latest order</h1>

        {latestOrders.length <= 0 ? (
          <div className="w-full h-28 text-center">User has no order</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="table-auto min-w-max border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="w-32 px-4 py-2">Txn Ref</th>
                  <th className="w-40 px-4 py-2">Product Name</th>
                  <th className="w-60 px-4 py-2">Product Description</th>
                  <th className="w-40 px-4 py-2">Category</th>
                  <th className="w-24 px-4 py-2">Price</th>
                  <th className="w-24 px-4 py-2">Discount</th>
                  <th className="w-32 px-4 py-2">Product Image</th>
                  <th className="w-32 px-4 py-2">Amount</th>
                  <th className="w-40 px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((order, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{order.tx_ref || "nil"}</td>
                    <td className="px-4 py-2">
                      {order.items[0].productName || "nil"}
                    </td>
                    <td className="px-4 py-2">
                      {order.items[0].Description || "nil"}
                    </td>
                    <td className="px-4 py-2">
                      {order.items[0].productCategory || "nil"}
                    </td>
                    <td className="px-4 py-2">
                      {order.items[0].productPrice || "nil"}
                    </td>
                    <td className="px-4 py-2">
                      {order.items[0].productDiscount || "nil"}
                    </td>
                    <td className="px-4 py-2">
                      {!order.items[0].productImgUrl[0]?.url ? (
                        "no image"
                      ) : (
                        <Image
                          className="rounded-md"
                          alt="Product Image"
                          src={order.items[0].productImgUrl[0].url}
                          height={50}
                          width={50}
                        />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {`${order.billing.currency || ""} ${
                        order.billing.amount || "nil"
                      }`}
                    </td>
                    <td className="px-4 py-2">
                      {moment(order.createdAt).fromNow() || "nil"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
