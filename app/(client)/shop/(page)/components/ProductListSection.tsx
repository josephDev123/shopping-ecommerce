"use client";

import ProductCard from "@/app/(client)/generic/ProductCard";
import { ProductDataType, ProductResponseType } from "@/app/types/productsType";
import Link from "next/link";
import React from "react";

interface ProductListSectionProps {
  data: ProductDataType[];
  itemsNumber: number;
  page: number;
  limit: number;
}
export default function ProductListSection({
  data,
  itemsNumber,
  page,
  limit,
}: ProductListSectionProps) {
  console.log("from prdict list", data);
  console.log("page and limit", page, limit);
  const totalPages = itemsNumber / 4;

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
        {Array.from({ length: Math.floor(itemsNumber / 4) }).map((res, i) => (
          <Link key={i} href={`/shop?page=${1}`}>
            <button
              disabled
              className="rounded-md p-2 bg-[#B88E2F] px-4 py-2 text-white font-medium"
            >
              {i + 1}
            </button>
          </Link>
        ))}
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
