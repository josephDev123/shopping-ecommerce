"use client";

import ProductCard from "@/app/(client)/generic/ProductCard";
import { IproductCardTypes, productCardData } from "@/app/data/productCardData";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import { ProductDataType } from "@/app/types/productsType";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface ProductListSectionProps {
  data: ProductDataType[];
}
export default function ProductListSection({ data }: ProductListSectionProps) {
  return (
    <>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-14 w-[80%] mx-auto">
        <>
          {data.length === 0 ? (
            <p>No data</p>
          ) : (
            <>
              {data?.map((item: ProductDataType) => (
                <ProductCard key={item._id} credential={item} />
              ))}
            </>
          )}
        </>
      </div>

      <div className="flex gap-5 items-center justify-center mb-6">
        {Array.from({ length: 6 }).map((res, i) => (
          <Link key={i} href={`/shop?page=${1}`}>
            <button className="rounded-md p-2 bg-[#B88E2F] px-4 py-2 text-white font-medium">
              {i + 1}
            </button>
          </Link>
        ))}
        <button className="rounded-md p-2 bg-[#F9F1E7] px-4 py-2 font-medium">
          Next
        </button>
      </div>
    </>
  );
}
