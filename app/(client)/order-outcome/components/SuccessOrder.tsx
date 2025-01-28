"use client";

import { axiosInstance } from "@/app/axiosInstance";
import { Images } from "@/app/Images";
import { transactionOutcomeType } from "@/app/types/transactionOutcomeType";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";

type SuccessOrderProps = {
  queryParam: { status: string; tx_ref: string; transaction_id: string };
};

// { queryParam }: SuccessOrderProps
export default function SuccessOrder({ queryParam }: SuccessOrderProps) {
  // const searchParams = useSearchParams();
  // const statuse = searchParams.get("status");
  // const tx_ref = searchParams.get("tx_ref");
  // const transaction_id = searchParams.get("transaction_id");
  // console.log(statuse, tx_ref, transaction_id);

  const [outcomeTransaction, setOutcomeTransaction] =
    useState<transactionOutcomeType>(null!);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  console.log("datas", outcomeTransaction);

  async function verifyOrderSuccess() {
    setStatus("loading");
    try {
      const req = await axiosInstance({
        method: "get",
        url: "api/verify-order",
        params: {
          status: queryParam.status,
          tx_ref: queryParam.tx_ref,
          transaction_id: queryParam.transaction_id,
          // status: statuse,
          // tx_ref: tx_ref,
          // transaction_id: transaction_id,
        },
      });
      const data: transactionOutcomeType = await req.data.data;
      console.log("data", data);
      setOutcomeTransaction(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  useEffect(() => {
    verifyOrderSuccess();
  }, [queryParam.status, queryParam.transaction_id, queryParam.tx_ref]);

  return (
    <>
      {status === "error" ? (
        <div className="w-full h-56 flex flex-col items-center justify-center p-3">
          Something went wrong
        </div>
      ) : (
        "Hello world"
      )}
    </>
  );
}
