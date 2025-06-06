"use  server";

import React, { Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import FooterPagination from "../../commons/FooterPagination";
import OrderPageMainWrapper from "./components/OrderPageMainWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { useSearchParams } from "next/navigation";

export interface OrderPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: OrderPageProps) {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/orders/orders?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 10
    }`
  );
  const data = await response.json();
  if (!response.ok) {
    return "Failed to fetch order data";
  }

  const result: ClientOrderType[] = data.data.orders;
  const totalDocs = data.data.totalOrders;

  // console.log(result);
  return (
    <section className="flex flex-col p-2 h-full">
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
      <h1 className="font-bold text-xl my-2">Orders</h1>
      <div>
        <Navbar searchParams={searchParams} />
      </div>

      {/* <Suspense key={Number(searchParams)} fallback={<p>Loading...</p>}> */}
      <div>
        <OrderPageMainWrapper data={result} totalRows={totalDocs} />
      </div>

      {/* </Suspense> */}

      {/* <Suspense key={Number(searchParams)} fallback={<p>Loading...</p>}>
        <FooterPagination
          searchParam={Number(searchParams.page) || 1}
          itemToShow={Number(searchParams.limit) || 4}
          totalDocs={totalDocs}
        />
      </Suspense> */}
    </section>
  );
}
