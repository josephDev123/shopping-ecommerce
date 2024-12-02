"use client";

import Button from "@/app/(client)/generic/Button";
import Input from "@/app/(client)/generic/Input";
import { Images } from "@/app/Images";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ExpandActionModal from "./ExpandActionModal";
import { ProductFormDataSchema } from "../../add-product/types/addProductDataTypes";
import { z } from "zod";
import { ClientOrderType } from "@/app/types/ClientOrderType";

interface ProductsListTableProps {
  data: ClientOrderType[];
}
export default function ProductsListTable({ data }: ProductsListTableProps) {
  return (
    <section className="flex flex-col h-full overflow-x-auto">
      <table className="table-auto">
        <thead className="">
          <tr className="text-[#747d8c] text-sm rounded-md">
            <th className="w-1/3  text-left p-3 bg-[#eceff3]">PRODUCT</th>
            <th className="text-left p-3 bg-[#eceff3]">CATEGORY</th>
            <th className="text-left p-3 bg-[#eceff3]">STOCK</th>
            <th className="text-left p-3 bg-[#eceff3]">PRICE</th>
            <th className="text-left p-3 bg-[#eceff3]">QTY</th>
            <th className="text-left p-3 bg-[#eceff3]">STATUS</th>
            <th className="text-left p-3 bg-[#eceff3]">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="odd:border-b border-gray-200  p-16">
          coming up tommorrow...
        </tbody>
      </table>
    </section>
  );
}
