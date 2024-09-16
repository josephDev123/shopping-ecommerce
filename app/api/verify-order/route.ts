import { useSearchParams } from "next/navigation";
import Flutterwave from "flutterwave-node-v3";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );
    const request = new URL(req.url);
    const queryParams = new URLSearchParams(request.searchParams);
    const queryStatus = queryParams.get("status");
    const queryTx_ref = queryParams.get("tx_ref");
    const queryTransaction_id = queryParams.get("transaction_id");
    // console.log(queryStatus, queryTx_ref, queryTransaction_id);
    if (queryStatus === "successful") {
      // const transactionDetails = await flw.Transaction.find({
      //   ref: queryTx_ref,
      // });
      const response = await flw.Transaction.verify({
        id: queryTransaction_id,
      });

      console.log(response);
      // if (
      //   response.data.status === "successful" &&
      //   response.data.amount === transactionDetails.amount &&
      //   response.data.currency === "NGN"
      // ) {
      //   // Success! Confirm the customer's payment
      // } else {
      //   // Inform the customer their payment was unsuccessful
      // }
    }

    return NextResponse.json({ message: "order status" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
