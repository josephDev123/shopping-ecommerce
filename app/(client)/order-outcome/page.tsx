import { Suspense } from "react";
import FailedOrder from "./components/FailedOrder";
import SuccessOrder from "./components/SuccessOrder";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id= ${searchParams.transaction_id}`
  );
  if (!response.ok) {
    return "error occur";
  }
  const result = await response.json();
  return (
    // <Suspense fallback="suspense Loading ...">
    <section className="flex flex-col h-full w-full">
      <Suspense
        fallback={
          <p className="flex flex-col justify-center items-center h-56">
            Loading ...
          </p>
        }
      >
        {/* {searchParams.status === "cancelled" && <FailedOrder />}*/}
        {/* {searchParams.status === "successful" && (
          <SuccessOrder queryParam={searchParams} />
        )} */}
        {JSON.stringify(result)}
        {JSON.stringify(process.env.NEXT_PUBLIC_BASEURL)}
        {JSON.stringify(searchParams.status)}
        {JSON.stringify(searchParams.tx_ref)}
        {JSON.stringify(searchParams.transaction_id)}
        {/* <p className="text-center p-2">hello outcome {searchParams.status}</p> */}
      </Suspense>
    </section>
  );
}
