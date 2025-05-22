import React from "react";
import SummaryCard from "./indexComponent/SummaryCard";
import DoughnutChart from "./indexComponent/Doughnut";
import BarChart from "./indexComponent/BarChart";
import customerNames from "./data/customer";
import BarLabel from "./indexComponent/BarLabel";
import { IOrder, OverviewResponse } from "@/app/types/overvieResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { abbreviateNumber } from "@/app/utils/abbreviateNumber";
import Image from "next/image";
import moment from "moment";
import { CustomFetch } from "@/app/serverActions/customFetch";
import DataTable from "@/components/ui/data-table";
import { latestOrdersColumn } from "./indexComponent/column/latestOrderColumn";
import { ILatestOrderDTO, IProduct } from "./indexComponent/ILatestOrder";
import LatestOrderContainer from "./indexComponent/LatestOrderContainer";
import path from "path";

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
  const totalSuccessTransaction = result?.transactionCountResult?.success;
  const totalPendingTransaction = result?.transactionCountResult?.pending;
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

  const latestOrders: ILatestOrderDTO[] = result.latestOrders
    ? result.latestOrders.map((item: IOrder) => ({
        items: item.items?.map((product: IProduct) => ({
          _id: product._id,
          productName: product.productName,
          Description: product.Description,
          productCategory: product.productCategory,
          productPrice: product.productPrice,
          productDiscount: product.productDiscount,
          productQuantity: product.productQuantity,
          productSKU: product.productSKU,
          productImgUrl: product.productImgUrl.map((img) => ({
            url: img.url,
            path: img.path,
          })),
        })),
        payment: {
          amount: item.payment.amount,
          currency: item.payment.currency,
        },
        billing: {
          amount: item.billing.amount,
          currency: item.billing.currency,
        },
        customer: {
          name: item.customer.name,
          email: item.customer.email,
        },
      }))
    : [];

  return (
    <section className="flex flex-col h-full p-3  w-full">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* <pre>{JSON.stringify(latestOrders, null, 2)}</pre> */}

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

        <LatestOrderContainer ColumnData={latestOrders} />
      </div>
    </section>
  );
}
