"use client";

import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import React from "react";
import { MdArrowDropDown, MdOutlineArrowDropDownCircle } from "react-icons/md";

export default function OrderPageMainWrapper() {
  return (
    <section>
      <div className="flex w-full justify-between my-8">
        <div>
          <Input
            name="order_id"
            type="search"
            placeholder="Search by order id"
            labelName=""
            className="bg-white border p-3 outline-none rounded-md drop-shadow-md w-fit"
          />
        </div>

        <div>
          <SelectInput
            name="date-range"
            data={[]}
            placeholder="Filter  by date range"
            labelName=""
            className="bg-white border p-3 outline-none rounded-md drop-shadow-md w-fit"
          />
        </div>
      </div>
      <div className="overflow-x-auto flex flex-col w-full h-full">
        <table className="table-auto border-spacing-y-6">
          <thead>
            <tr className="">
              <th className="text-left">ORDER ID</th>
              <th className="text-left">CREATED</th>
              <th className="text-left">CUSTOMER</th>
              <th className="text-left">TOTAL </th>
              <th className="text-left">PROFIT</th>
              <th className="text-left">STATUS</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody className="">
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
            </tr>
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
            </tr>
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
