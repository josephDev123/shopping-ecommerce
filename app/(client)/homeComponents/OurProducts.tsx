"use client";

import ProductCard from "../generic/ProductCard";
import Button from "../generic/Button";
import { useRouter } from "next/navigation";
import { ProductDataType, ProductResponseType } from "@/app/types/productsType";
import { useAppSelector } from "@/lib/slices/hooks";

type IOurProducts = {
  data: ProductResponseType;
};

export default function OurProducts({ data }: IOurProducts) {
  const navigate = useRouter();

  return (
    <section className="flex flex-col justify-center items-center my-8 sm:w-[80%] w-[90%] mx-auto">
      <h1 className="font-bold text-2xl mb-4"> Our Products</h1>

      <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-3  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {Array.isArray(data) && data?.length < 0 && (
          <small className="text-sm text-red-400">No data</small>
        )}

        {Array.isArray(data) && data?.length > 0 && (
          <>
            {data.map((item: ProductDataType) => (
              <ProductCard key={item._id} credential={item} />
            ))}
          </>
        )}
      </div>
      <Button
        onClick={() => navigate.push("/shop")}
        textContent="Show More"
        className="mt-8 border border-[#B88E2F] px-5 py-2 font-bold text-[#B88E2F] hover:text-[#ddba6a]"
      />
    </section>
  );
}
