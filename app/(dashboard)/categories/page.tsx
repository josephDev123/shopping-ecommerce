import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import Button from "@/app/(client)/generic/Button";
import { MdArrowDropDown, MdOutlineArrowDropDownCircle } from "react-icons/md";
import FooterPagination from "../commons/FooterPagination";
import CategoryMainSection from "./components/CategoryMainWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
// import { auth } from "@/app/utils/getServerSession";
// import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { OrderType } from "@/models/OrderModel";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { CategoryType } from "@/app/types/categoryType";

export interface OrderPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: OrderPageProps) {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/category/categories?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 4
    }`
  );
  if (!response.ok) {
    return "Failed to fetch categories data";
  }

  const data = await response.json();
  const result: CategoryType[] = data.data.categoryPurchased;
  const totalCategories = data.data.totalPurchaseCategoryCount;
  // console.log(data);
  return (
    <section className="flex flex-col p-2 h-full">
      {/* {JSON.stringify(session)} */}
      <h1 className="font-bold text-xl my-2">Categories </h1>
      {/* <Navbar searchParams={searchParams} /> */}
      <Suspense fallback={<p>Loading...</p>}>
        <CategoryMainSection data={result} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <FooterPagination
          itemToShow={Number(searchParams.limit) || 4}
          totalDocs={totalCategories}
          searchParam={Number(searchParams.page) || 1}
        />
      </Suspense>
    </section>
  );
}
