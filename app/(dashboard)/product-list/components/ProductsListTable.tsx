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

interface ProductsListTableProps {
  data: any[] | null;
}
export default function ProductsListTable({ data }: ProductsListTableProps) {
  const [isOpenAction, setIsOpenAction] = useState(false);
  return (
    <section className="flex flex-col h-full overflow-x-auto">
      <table className="table-auto  h-fit relative">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="flex items-center">
              <Input
                name="check"
                type="checkbox"
                className=" w-6 h-6 border-2 border-gray-200 accent-green-700"
                labelName=""
              />
            </th>
            <th className="w-1/3  text-left">PRODUCT</th>
            <th className="text-left">CATEGORY</th>
            <th className="text-left">STOCK</th>
            <th className="text-left">PRICE</th>
            <th className="text-left">QTY</th>
            <th className="text-left">STATUS</th>
            <th className="text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="odd:border-b border-gray-200">
          {data?.map((item, i) => (
            <tr key={i} className="relative">
              <td>
                <Input
                  name=""
                  type="checkbox"
                  className=" w-6 h-6 border-2 border-gray-200 accent-green-700"
                  labelName=""
                />
              </td>
              <td className="flex justify-center gap-3">
                <img
                  src={item.productImgUrl[0] as string}
                  alt="product image"
                  className="object-contain"
                  height={40}
                  width={40}
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg">{item.productName}</h2>
                  <p className="text-black/70 text-sm">{item.Description}</p>
                </div>
              </td>
              <td>
                <span className="border border-gray-300 p-2 rounded-md">
                  {item.productCategory}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="rounded-full px-1 py-1 w-20 flex bg-[#5C4ECD]"
                >
                  <span className="h-6 w-6 rounded-full bg-white"></span>
                </button>
              </td>
              <td className="font-semibold"> {item.productPrice}</td>
              <td>{item.productQuantity}</td>
              <td>
                <Button className="flex items-center gap-1">
                  <div className="border p-0.5 h-4 w-4 rounded-full  border-green-400 flex flex-col items-center justify-center">
                    <span className=" rounded-full h-full w-full bg-green-600"></span>
                  </div>
                  Published
                </Button>
              </td>
              <td className="">
                <BsThreeDotsVertical
                  onClick={() => setIsOpenAction((prev) => !prev)}
                  className="translate-x-6  text-2xl cursor-pointer hover:bg-gray-200 rounded-full p-1"
                />
                {isOpenAction && (
                  <div className="h-full absolute z-30 top-[60px]">
                    <ExpandActionModal productId={item._id} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
