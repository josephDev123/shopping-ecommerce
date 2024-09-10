"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import SuccessOrder from "./SuccessOrder";
import FailedOrder from "./FailedOrder";

export default function MainPage() {
  const status = useSearchParams().get("status");
  const tx_ref = useSearchParams().get("tx_ref");
  const transaction_id = useSearchParams().get("transaction_id");

  console.log(transaction_id, tx_ref, status);

  return (
    <section className="flex flex-col h-full w-full">
      {status === "failed" && <FailedOrder />}
      {status === "successful" && <SuccessOrder />}
    </section>
  );
}
