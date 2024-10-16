"use client";

import { IproductCategory } from "@/app/data/productCategory";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import Image from "next/image";
import ProductCardLoading from "../generic/ProductLoading";
import { ApiProductResponseType, CategoryType } from "@/app/types/categoryType";

type IBrowserProductRange = {
  data: ApiProductResponseType;
};

export default function BrowserProductRange({ data }: IBrowserProductRange) {
  return (
    <section className="flex flex-col items-center py-6 w-[80%] mx-auto">
      <h2 className="font-bold text-xl">Browse The Range</h2>
      <p className="text-center sm:max-w-[70%] w-full">
        Explore our diverse selection of products, carefully curated to meet
        your needs. Whether you're looking for the latest trends or timeless
        classics, we have something for everyone.
      </p>

      <div className="grid sm:grid-cols-3 min-[425px]:grid-cols-2 grid-cols-1 gap-6 relative w-full mt-8">
        {data.type === "error" && (
          <small className="text-sm text-red-400">Something went wrong</small>
        )}
        {/* {status === "loading" &&
          Array.from({ length: 4 }, (_, index) => <ProductCardLoading />)} */}

        {data.data?.length < 0 && (
          <small className="text-sm text-red-400">No data</small>
        )}

        {data.data?.length > 0 && (
          <>
            {data.data.map((item: CategoryType, i: number) => (
              <div
                key={i}
                className="flex flex-col justify-start items-start space-y-3 rounded-lg border overflow-hidden"
              >
                <Image
                  src={item.products[0].productImgUrl[0].url}
                  alt=""
                  objectFit="contain"
                  width={100}
                  height={100}
                  className="max-h-[250px] object-cover "
                  placeholder="blur"
                  blurDataURL="blur"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
                <p className="font-bold p-2">{item._id}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
