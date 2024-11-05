"use client";

import Input from "@/app/(client)/generic/Input";
import { Images } from "@/app/Images";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import moment from "moment";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CiLock, CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface CustomerTableProps {
  data: ClientOrderType[];
}

export default function CustomerTable({ data }: CustomerTableProps) {
  const [search, setSearch] = useState<string | null>(null);

  //   const searchParam = useSearchParams().get("status") ?? null;

  const filteredData = data.filter((order) => {
    const matchesName =
      !search ||
      String(order.customer.name).toLowerCase().includes(search.toLowerCase());
    const matchEmail =
      !search ||
      String(order.customer.email).toLowerCase().includes(search.toLowerCase());

    return matchEmail || matchesName;
  });
  return (
    <section className="flex flex-col w-full h-full p-3">
      <Input
        name=""
        labelName=""
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        icon={<CiSearch className="text-xl" />}
        type="text"
        className=" outline-none"
        wrapperClassName="border rounded-md p-2 w-fit"
      />
      <div className="flex flex-col overflow-x-auto w-full h-full my-5">
        <table className="table-auto">
          <thead className="border-b-2 bg-gray-200">
            <tr className="">
              <th className="text-left text-nowrap px-3 py-1 class">NAME</th>
              <th className="text-left text-nowrap px-3 py-1 class">
                PHONE NUMBER
              </th>
              <th className="text-left text-nowrap px-3 py-1 class">CREATED</th>
              <th className="text-left text-nowrap px-3 py-1 class">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((customer, i) => (
              <tr className="border-b-2" key={i}>
                <td className=" gap-2 flex w-fit h-fit p-2 ">
                  <div className="rounded-full h-10 w-10 relative block bg-gray-200 overflow-clip">
                    <Image
                      src={Images.avatar}
                      alt={"user pic"}
                      // width={16}
                      // height={16}
                      // objectFit="contain"
                      fill
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col leading-tight w-fit">
                    <h2 className="font-bold">{customer.customer.name}</h2>
                    <p className="text-sm">{customer.customer.email}</p>
                  </div>
                </td>
                <td className=" p-3 text-nowrap">
                  {customer.customer.phonenumber}
                </td>
                <td className=" p-3 text-nowrap">
                  {moment(customer.createdAt).format("DD MMM YYYY")}
                </td>
                <td className="flex gap-2 h-16 items-center p-3 text-nowrap">
                  <FiEdit className="cursor-pointer" />
                  <CiLock className="cursor-pointer" />
                  <RiDeleteBinLine className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
