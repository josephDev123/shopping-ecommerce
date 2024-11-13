import React from "react";
import Navbar from "./components/Navbar";
import FooterPagination from "../commons/FooterPagination";
import OrderPageMainWrapper from "./components/OrderPageMainWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { ClientOrderType } from "@/app/types/ClientOrderType";

export interface OrderPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: OrderPageProps) {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/orders/orders?user_id=${
      session?.user.id
    }&page=${searchParams.page ?? 1}&limit=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const result: ClientOrderType[] = data.data;
  // console.log(data);
  return (
    <section className="flex flex-col p-2 h-full">
      {/* {JSON.stringify(session)} */}
      <h1 className="font-bold text-xl my-2">Order Management</h1>
      <Navbar searchParams={searchParams} />
      <OrderPageMainWrapper data={result} />
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
