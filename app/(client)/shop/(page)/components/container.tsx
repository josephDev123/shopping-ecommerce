"use client";

import ThingsToEnjoy from "@/app/(client)/generic/ThingsToEnjoy";
import ItemLimit from "./ItemLimit";
import ProductListSection from "./ProductListSection";
import ShopFilter from "./ShopFilter";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductDataType } from "@/app/types/productsType";

interface IContainer {
  page: number;
  limit: number;
  totalDoc: number;
  data: ProductDataType[];
  categories: string[];
}

export default function Container({
  data,
  limit,
  page,
  totalDoc,
  categories,
}: IContainer) {
  const searchParams = useSearchParams();
  const size = searchParams.get("size") ?? "";
  const price = searchParams.get("price") ?? 0;
  const category = searchParams.get("category") ?? "";

  const filteredData = useMemo(() => {
    if (!size && !price && !category) return data;
    return data.filter(
      (item) =>
        item.productPrice <= price ||
        item.productCategory.toLocaleLowerCase() ===
          category.toLocaleLowerCase() ||
        item.productSize === size
    );
  }, [size, price, category, data]);
  //   console.log(filteredData);

  return (
    <section className="flex flex-col">
      <div className="flex sm:flex-row gap-2 flex-col sm:items-center justify-around bg-[#F9F1E7] h-fit py-1 px-3">
        <div className="flex md:flex-row sm:flex-col flex-row gap-2 items-start justify-start sm:order-1 order-2 min-[375px]:text-base text-sm">
          <ShopFilter categories={categories} />

          <p className="">
            Showing {page}–{page * limit} of {totalDoc || 0} results
          </p>
        </div>

        <ItemLimit />
      </div>

      <ProductListSection
        data={filteredData}
        itemsNumber={totalDoc}
        limit={limit}
      />

      <ThingsToEnjoy />
    </section>
  );
}
