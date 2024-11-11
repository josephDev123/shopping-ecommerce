import React from "react";
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
    }&page=${searchParams.page ?? 1}&limit=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const result: CategoryType[] = data.data;
  // console.log(data);
  return (
    <section className="flex flex-col p-2 h-full">
      {/* {JSON.stringify(session)} */}
      <h1 className="font-bold text-xl my-2">Categories Management</h1>
      {/* <Navbar searchParams={searchParams} /> */}
      <CategoryMainSection data={result} />
      <footer className="mt-auto ms-auto">
        <button
          type="button"
          className="border border-green-400 rounded-md py-0.5 px-2 font-semibold text-green-400 hover:bg-green-100 hover:text-green-500"
        >
          Next
        </button>
      </footer>
    </section>
  );
}
