"use client";

import { IproductCategory } from "@/app/data/productCategory";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import Image from "next/image";
import ProductCardLoading from "../generic/ProductLoading";
import { ProductCategoryType } from "@/app/types/categoryType";

type IBrowserProductRange = {
  data: IproductCategory[];
};

export default function BrowserProductRange({ data }: IBrowserProductRange) {
  const {
    status,
    data: productCategory,
    additionalData,
  } = useFetchFilterAndPaginateApi("api/category/categories", "", "", "8");
  console.log(status, productCategory, additionalData);
  return (
    <section className="flex flex-col items-center py-6 w-[80%] mx-auto">
      <h2 className="font-bold text-xl">Browse The Range</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div className="grid sm:grid-cols-3 min-[425px]:grid-cols-2 grid-cols-1 gap-6 relative w-full mt-8">
        {status === "error" && (
          <small className="text-sm text-red-400">Something went wrong</small>
        )}
        {status === "loading" &&
          Array.from({ length: 4 }, (_, index) => <ProductCardLoading />)}

        {productCategory.length < 0 && (
          <small className="text-sm text-red-400">No data</small>
        )}

        {productCategory.length > 0 && (
          <>
            {productCategory.map((item: ProductCategoryType, i: number) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center space-y-3"
              >
                <Image
                  src={item.products[0].productImgUrl[0].url}
                  alt=""
                  objectFit="contain"
                  width={100}
                  height={100}
                  placeholder="blur"
                  blurDataURL="blur"
                  style={{ width: "100%", height: "auto" }}
                />
                <p className="font-bold">{item._id}</p>
              </div>
            ))}
          </>
        )}

        {/* {data.map((productCategory) => (
          <div
            key={productCategory.id}
            className="flex flex-col justify-center items-center space-y-3"
          >
            <Image
              src={productCategory.imgurl}
              alt=""
              objectFit="contain"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
            <p className="font-bold">{productCategory.category_name}</p>
          </div>
        ))} */}
      </div>
    </section>
  );
}
