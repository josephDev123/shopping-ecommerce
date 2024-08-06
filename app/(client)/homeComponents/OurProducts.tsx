"use client";

import { IproductCardTypes } from "@/app/data/productCardData";
import ProductCard from "../generic/ProductCard";
import Button from "../generic/Button";
import { useRouter } from "next/navigation";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import ProductCardLoading from "../generic/ProductLoading";

// type IOurProducts = {
//   data: IproductCardTypes[];
// };

export default function OurProducts() {
  const navigate = useRouter();
  const {
    status,
    data: productData,
    additionalData,
  } = useFetchFilterAndPaginateApi("api/product/products", "", "", "8");
  // console.log(status, productData, additionalData);
  return (
    <section className="flex flex-col justify-center items-center my-8 w-[80%] mx-auto">
      <h1 className="font-bold text-2xl mb-4"> Our Products</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
        {status === "error" && (
          <small className="text-sm text-red-400">Something went wrong</small>
        )}
        {status === "loading" &&
          Array.from({ length: 4 }, (_, index) => <ProductCardLoading />)}

        {productData?.length < 0 && (
          <small className="text-sm text-red-400">No data</small>
        )}

        {productData?.length > 0 && (
          <>
            {productData.map((item: IproductCardTypes) => (
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
