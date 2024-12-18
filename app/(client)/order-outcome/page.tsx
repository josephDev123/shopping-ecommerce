// "use  client";

import { Suspense } from "react";
import FailedOrder from "./components/FailedOrder";
import SuccessOrder from "./components/SuccessOrder";

export default function page({
  searchParams,
}: {
  searchParams: { status: string; tx_ref: string; transaction_id: string };
}) {
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
        {searchParams.status === "cancelled" && <FailedOrder />}
        {searchParams.status === "successful" && <SuccessOrder />}
      </Suspense>
    </section>
  );
}
