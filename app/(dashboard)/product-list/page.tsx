"use client";

import Button from "@/app/(client)/generic/Button";
import { LuUpload } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { SelectInput } from "@/app/(client)/generic/Input";
import ProductsListTable from "./components/ProductsListTable";
import FooterPagination from "../commons/FooterPagination";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import { z } from "zod";
import { ProductFormDataSchema } from "../add-product/types/addProductDataTypes";
import { useState } from "react";

interface pageProps {
  searchParams: {
    [key: string]: string | number | string[] | number[] | undefined;
  };
}

export default function page({ searchParams }: pageProps) {
  const [limit, setLimit] = useState("3");
  const paramKey = "page";
  const paramValue = searchParams.page as string;
  type productType = z.infer<typeof ProductFormDataSchema>;
  console.log("product list", paramValue);
  const {
    data: productData,
    status,
    additionalData,
  } = useFetchFilterAndPaginateApi(
    "product/products",
    paramKey,
    paramValue,
    limit
  );

  console.log(productData, status, additionalData);
  return (
    <section className="flex flex-col w-full h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">product List</h2>
          <p className="text-sm">
            Manage your store's progress to increase your sales.
          </p>
        </div>

        <div className="flex gap-3">
          <Button className="border-2 rounded-md border-gray-200 hover:bg-gray-200 px-2 py-1">
            <span className="flex items-center gap-2 font-bold">
              <LuUpload />
              Export
            </span>
          </Button>
          <Button className="rounded-md  px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white">
            <span className="flex items-center gap-2">
              <GoPlus className="text-xl" />
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <hr className="border  border-gray-300 my-4" />
      <div className="flex w-full justify-between">
        <h2 className="text-xl font-semibold w-full">Filter</h2>
        <div className="flex items-center gap-3 w-full">
          <span className="w-fit whitespace-nowrap font-semibold">
            Sort By:
          </span>
          <SelectInput
            name="status"
            data={[]}
            labelName=""
            placeholder="Status"
            className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
          />
          <SelectInput
            name="category"
            data={[]}
            labelName=""
            placeholder="Category"
            className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
          />

          <SelectInput
            name="stock"
            data={[]}
            labelName=""
            placeholder="Stock"
            className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
          />
        </div>
      </div>
      <div className="my-5 h-full">
        {status == "loading" && (
          <div className="flex justify-center mt-auto">Loading ...</div>
        )}

        {/* {Array.isArray(productData) && productData.length === 0 && (
          <div className="flex justify-center h-full mt-auto">No data</div>
        )} */}
        {status === "data" &&
          Array.isArray(productData) &&
          Number(productData?.length) >= 1 && (
            <div className="h-full">
              <ProductsListTable data={productData} />
            </div>
          )}
      </div>

      <FooterPagination
        itemToShow={limit}
        // pages={productData}
        searchParam={paramValue}
        setLimit={(e: string) => setLimit(e)}
        totalDocs={additionalData.totalDoc}
      />
    </section>
  );
}
