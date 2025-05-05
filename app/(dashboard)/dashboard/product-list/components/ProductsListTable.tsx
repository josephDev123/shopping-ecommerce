"use client";

import { Images } from "@/app/Images";
import { TransactionServerResponseType } from "@/app/types/TransactionType";
import { TransactionType } from "@/models/FlwTransactionModel";
import moment from "moment";
import Image from "next/image";

interface ProductsListTableProps {
  // data: TransactionServerResponseType[];
  data: TransactionType[];
}
export default function ProductsListTable({ data }: ProductsListTableProps) {
  console.log(data);
  return (
    <section className="flex flex-col h-full overflow-x-auto">
      <table className="table-auto">
        <thead className="">
          <tr className="text-[#747d8c] text-sm rounded-md">
            <th className="w-1/3  text-left p-3 bg-[#eceff3]">PRODUCT</th>
            <th className="text-left p-3 bg-[#eceff3]">Description</th>
            <th className="text-left p-3 bg-[#eceff3]">STOCK</th>
            <th className="text-left p-3 bg-[#eceff3]">PRICE</th>

            <th className="text-left p-3 bg-[#eceff3]">STATUS</th>
            <th className="text-left p-3 bg-[#eceff3]">CREATED AT</th>
          </tr>
        </thead>
        <tbody className="odd:border-b border-gray-200  p-16">
          {data?.length < 1 ? (
            <tr>
              <td colSpan={7} className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            data?.map((item, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-100">
                <td className="p-3 inline-flex gap-2 items-center sm:w-[400px] w-[200px]">
                  <Image
                    src={Images.product6}
                    width={26}
                    height={26}
                    alt={""}
                  />
                  <div className="inline-block ">
                    <p className="truncate">
                      {/* {item.orderDetails.items[0].productName} */}
                    </p>

                    <p className="truncate text-sm text-gray-500">
                      {/* {item.orderDetails.items[0].productCategory} */}
                    </p>
                  </div>
                </td>
                <td className="p-3 ">
                  <p className="line-clamp-2 w-[300px]">
                    {/* {item.orderDetails.items[0].Description} */}
                  </p>
                </td>
                <td className="p-3">{"??"}</td>
                <td className="p-3 text-nowrap">
                  <span className="bg-[#dbf6cb] text-green-700 py-1 px-2 text-sm font-semibold rounded-full">
                    {`${item.data.currency} ${item.data.amount}`}
                  </span>
                </td>
                <td className="p-3 text-nowrap">{item.data.status}</td>
                <td className="p-3 text-nowrap">
                  {moment(item.data.created_at).format("MMM DD YYYY hh:mm")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
