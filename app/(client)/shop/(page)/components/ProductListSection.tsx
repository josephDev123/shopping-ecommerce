"use client";
import ProductCard from "@/app/(client)/generic/ProductCard";
import { ProductDataType, ProductResponseType } from "@/app/types/productsType";
import Link from "next/link";
import React, { useState } from "react";

interface ProductListSectionProps {
  data: ProductDataType[];
  itemsNumber: number;
  limit: number;
}
export default function ProductListSection({
  data,
  itemsNumber,
  limit,
}: ProductListSectionProps) {
  // console.log("from product list", data);

  const [result, setResult] = useState([]);
  // console.log("page and limit", );

  return (
    <>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-14 w-[80%] mx-auto">
        <>
          {Array.isArray(data) && data?.length <= 0 && (
            <div className="h-32 pl-10 items-center">No data</div>
          )}

          {Array.isArray(data) && data?.length > 0 && (
            <>
              {data?.map((item: ProductDataType, i: number) => (
                <ProductCard key={i} credential={item} />
              ))}
            </>
          )}
        </>
      </div>

      <div className="flex gap-5 items-center justify-center mb-6 flex-wrap">
        {Array.from({ length: Math.ceil(itemsNumber / limit) }).map(
          (res, i) => (
            <Link
              key={i}
              href={`/shop?page=${i + 1}&limit=${limit}`}
              className="cursor-pointer "
            >
              <button
                className={` rounded-md p-2 bg-[#B88E2F] px-4 py-2 text-white font-medium`}
              >
                {i + 1}
              </button>
            </Link>
          )
        )}
        <button
          disabled
          className={`cursor-not-allowed rounded-md p-2 bg-[#F9F1E7] px-4 py-2 font-medium`}
        >
          Next
        </button>
      </div>
    </>
  );
}
