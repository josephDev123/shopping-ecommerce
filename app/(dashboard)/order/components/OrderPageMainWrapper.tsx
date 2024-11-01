"use client";

import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { OrderType } from "@/models/OrderModel";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { MdArrowDropDown, MdOutlineArrowDropDownCircle } from "react-icons/md";

interface OrderPageMainWrapperProps {
  data: ClientOrderType[];
}
export default function OrderPageMainWrapper({
  data,
}: OrderPageMainWrapperProps) {
  // const [orderData, setOrderData] = useState<ClientOrderType[]>(data);
  const [search_Id, setSearchId] = useState<string | null>(null);

  const searchParam = useSearchParams().get("status") ?? null;

  const filteredData = data.filter((order) => {
    const matchesStatus =
      !searchParam || order.payment.status.toLowerCase() === searchParam;
    const matchesId =
      !search_Id ||
      String(order.user_id).toLowerCase().includes(search_Id.toLowerCase());

    return matchesStatus && matchesId;
  });

  const handleSearchId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const TimeId = setTimeout(() => {
    setSearchId(e.target.value);
    // }, 1000);

    // clearTimeout(TimeId);
  };

  console.log(filteredData, search_Id);
  return (
    <section>
      <div className="flex sm:flex-row flex-col justify-between items-start gap-4 my-4">
        {/* <div className="bg-red-200 w-full"> */}
        <Input
          name="order_id"
          type="search"
          placeholder="Search by order id"
          onChange={handleSearchId}
          labelName=""
          className="bg-white border p-3  outline-none rounded-md drop-shadow-md sm:max-w-[320px] w-full"
        />
        {/* </div> */}

        <div className=" sm:max-w-[320px] w-full">
          <SelectInput
            name="date-range"
            data={[]}
            placeholder="Filter by date range"
            labelName=""
            className="bg-white border p-3 outline-none rounded-md drop-shadow-md  "
          />
        </div>
      </div>
      <div className="overflow-x-auto flex flex-col w-full h-full">
        <table className="table-auto border-spacing-y-6">
          <thead>
            <tr className="">
              <th className="text-left px-4">ORDER ID</th>
              <th className="text-left px-4">CREATED</th>
              <th className="text-left px-4">CUSTOMER</th>
              <th className="text-left px-4">TOTAL </th>
              <th className="text-left px-4">PROFIT</th>
              <th className="text-left px-4">STATUS</th>
              <th className="text-left px-4"></th>
            </tr>
          </thead>
          <tbody className="">
            {filteredData.map((item, i) => (
              <tr key={i} className="border-b-2">
                <td className="p-2 text-nowrap">{item._id}</td>
                <td className="p-2 text-nowrap">
                  {moment(item.createdAt).fromNow()}
                </td>
                <td className="p-2 text-nowrap">{item.customer.name}</td>
                <td className="p-2 text-nowrap">
                  {item.payment.currency ?? ""} {item.payment.amount}
                </td>
                <td className="p-2 inline-flex gap-1 items-center">
                  {/* $154
                  <span className="bg-[#7ce4ab] text-[#31985f] font-bold p-1">
                    16%
                  </span> */}
                  ''
                </td>
                <td>
                  <Button
                    textContent=""
                    className="p-1 flex items-center bg-[#FFC600] rounded-md "
                  >
                    <span>{item.payment.status}</span>
                    {/* <MdArrowDropDown /> */}
                  </Button>
                </td>
                <td>
                  <MdOutlineArrowDropDownCircle className="text-xl cursor-pointer" />
                </td>
              </tr>
            ))}
            {/* 
            <tr className="border-b-2">
              <td className="p-2">#6548</td>
              <td className="p-2">2 min ago</td>
              <td className="p-2">Joseph Wheeler</td>
              <td className="p-2">$654</td>
              <td className="p-2 inline-flex gap-1 items-center">
                $154{" "}
                <span className="bg-[#7ce4ab] text-[#31985f] font-bold p-1">
                  16%
                </span>
              </td>
              <td>
                <Button
                  textContent=""
                  className="p-1 flex items-center bg-[#FFC600] rounded-md "
                >
                  <span>Pending</span> <MdArrowDropDown />
                </Button>
              </td>
              <td>
                <MdOutlineArrowDropDownCircle className="text-xl cursor-pointer" />
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* <FooterPagination
        itemToShow=""
        totalDocs={0}
        searchParam=""
        setLimit={() => ""}
      /> */}
    </section>
  );
}
