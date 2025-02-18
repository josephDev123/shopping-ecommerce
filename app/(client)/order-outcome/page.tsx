"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import FailedOrder from "./components/FailedOrder";
import SuccessOrder from "./components/SuccessOrder";
import { useSearchParams } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [data, setData] = useState<Record<string, string | number>>({});
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
        setData(result);
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
    // <Suspense fallback="suspense Loading ...">
    <section className="flex flex-col h-full w-full">
      {/* <Suspense
        fallback={
          <p className="flex flex-col justify-center items-center h-56">
            Loading ...
          </p>
        }
      > */}
      {/* {searchParams.status === "cancelled" && <FailedOrder />}*/}
      {/* {searchParams.status === "successful" && (
          <SuccessOrder queryParam={searchParams} />
        )} */}
      {JSON.stringify(data)}
      {/* {JSON.stringify(searchParams.status)} */}
      {/* {JSON.stringify(process.env.NEXT_PUBLIC_BASEURL)}
        {JSON.stringify(searchParams.status)}
        {JSON.stringify(searchParams.tx_ref)}
        {JSON.stringify(searchParams.transaction_id)} */}
      {/* <p className="text-center p-2">hello outcome {searchParams.status}</p> */}
      {/* </Suspense> */}
    </section>
  );
}
