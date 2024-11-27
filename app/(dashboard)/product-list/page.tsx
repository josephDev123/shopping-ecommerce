// "use client";

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
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import FilterSection from "./components/FilterSection";
import ExportSection from "./components/ExportSection";

interface pageProps {
  searchParams: {
    [key: string]: string | number | string[] | number[] | undefined;
  };
}

export default async function page({ searchParams }: pageProps) {
  const session = await getServerSession(authOptions);
  // const [limit, setLimit] = useState("3");
  // const paramKey = "page";
  // const paramValue = searchParams.page as string;
  type productType = z.infer<typeof ProductFormDataSchema>;
  // console.log("product list", paramValue);
  // const {
  //   data: productData,
  //   status,
  //   additionalData,
  // } = useFetchFilterAndPaginateApi(
  //   "product/products",
  //   paramKey,
  //   paramValue,
  //   limit
  // );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 4
    }`
    // {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   next: {
    //     revalidate: 10,
    //   },
    // }
  );

  if (!response.ok) {
    return "Failed to fetch purchased products data";
  }

  const data = await response.json();

  console.log(data);
  return (
    <section id="productPage" className="flex flex-col w-full h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">product List</h2>
          <p className="text-sm">
            {/* Manage your store's progress to increase your sales. */}
            Manage all the products you have bought.
          </p>
        </div>

        <ExportSection pageId="productPage" />
      </div>
      <hr className="border  border-gray-300 my-4" />
      <FilterSection />
      <div className="my-5 h-full">
        Table Coming soon...
        {/* {Array.isArray(productData) && productData.length === 0 && (
          <div className="flex justify-center h-full mt-auto">No data</div>
        )} */}
        {/* {status === "data" &&
          Array.isArray(productData) &&
          Number(productData?.length) >= 1 && (
            <div className="h-full">
              <ProductsListTable data={productData} />
            </div>
          )} */}
      </div>

      {/* <FooterPagination
        itemToShow={limit}
        // pages={productData}
        searchParam={paramValue}
        setLimit={(e: string) => setLimit(e)}
        totalDocs={additionalData.totalDoc}
      /> */}
    </section>
  );
}
