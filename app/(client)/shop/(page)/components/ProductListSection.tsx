"use client";

import ProductCard from "@/app/(client)/generic/ProductCard";
import { IproductCardTypes, productCardData } from "@/app/data/productCardData";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function ProductListSection() {
  const query = useParams();
  const itemPerPage = "12";
  console.log(query);
  const {
    status,
    data: productData,
    additionalData,
  } = useFetchFilterAndPaginateApi("product/products", "page", "", itemPerPage);
  const total_doc = additionalData.totalDoc;
  const paginationBtn = Math.ceil(total_doc / Number(itemPerPage));

  //   console.log(status, productData, additionalData);
  return (
    <>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-14 w-[80%] mx-auto">
        {status === "loading" ? (
          <p>Loading ...</p>
        ) : status === "error" ? (
          <p>Something went wrong</p>
        ) : (
          <>
            {productData.length === 0 ? (
              <p>No data</p>
            ) : (
              <>
                {productData.map((item: IproductCardTypes) => (
                  <ProductCard key={item._id} credential={item} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <div className="flex gap-5 items-center justify-center mb-6">
        {Array.from({ length: paginationBtn }).map((res, i) => (
          <Link href={`/shop?page=${1}`}>
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
