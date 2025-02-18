"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import FailedOrder from "./components/FailedOrder";
import SuccessOrder from "./components/SuccessOrder";
import { useSearchParams } from "next/navigation";
import { transactionOutcomeType } from "@/app/types/transactionOutcomeType";
import ComponentLoading from "../generic/ComponentLoading";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [data, setData] = useState<transactionOutcomeType>(null!);
  const [status, setStatus] = useState<"idle" | "loading" | "data" | "error">(
    "idle"
  );

  // const memoOrderData = useCallback(
  //   async function OrderData() {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASEURL}/api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id=${searchParams.transaction_id}`
  //     );
  //     setStatus("loading");
  //     if (!response.ok) {
  //       setStatus("error");
  //     }
  //     const result = await response.json();
  //     setStatus("data");
  //     setData(result);
  //   },
  //   [searchParams.status, searchParams.tx_ref, searchParams.transaction_id]
  // );

  const memoOrderData = useCallback(
    async function OrderData() {
      setStatus("loading");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id=${searchParams.transaction_id}`
        );

        if (!response.ok) throw new Error("API request failed");

        const result = await response.json();
        setData(result.data);

        setStatus("data");
      } catch (error) {
        console.error("Error fetching order data:", error);
        setStatus("error");
      }
    },
    [searchParams.status, searchParams.tx_ref, searchParams.transaction_id]
  );

  useEffect(() => {
    memoOrderData();
  }, [memoOrderData]);

  useEffect(() => {
    memoOrderData();
  }, [memoOrderData]);

  console.log(data);

  // [searchParams.status, searchParams.tx_ref, searchParams.transaction_id]
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASEURL}/api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id= ${searchParams.transaction_id}`
  // );
  // if (!response.ok) {
  //   return (
  //     <div className="h-42 flex flex-col justify-center items-center">
  //       error occurs
  //     </div>
  //   );
  // }
  // const result = await response.json();
  return (
    <section className="flex flex-col h-full w-full">
      {status == "loading" ? (
        <ComponentLoading />
      ) : status === "error" ? (
        <p className="text-red-300 ">Something went wrong</p>
      ) : (
        <>
          {searchParams.status === "cancelled" && <FailedOrder />}
          {searchParams.status === "successful" && (
            <SuccessOrder successTransaction={data} />
          )}
        </>
      )}
    </section>
  );
}
