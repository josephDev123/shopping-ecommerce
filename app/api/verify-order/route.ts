import { useSearchParams } from "next/navigation";
import Flutterwave from "flutterwave-node-v3";
import { NextResponse } from "next/server";
import { TransactionModel } from "@/models/TransactionModel";
import OrderModel, { OrderType } from "@/models/OrderModel";

export async function GET(req: Request) {
  try {
    let memoized = false;
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
      const transactionDetails = await OrderModel.findOneAndUpdate(
        { tx_ref: queryTx_ref },
        { $set: { "payment.status": "success" } },
        { new: true }
      );
      const response = await flw.Transaction.verify({
        id: queryTransaction_id,
      });

      // console.log(response);
      if (
        response.data.status === "successful" &&
        response.data.amount === transactionDetails.payment.amount &&
        response.data.currency === "NGN"
      ) {
        if (!memoized) {
          memoized = true;
          // Success! Confirm the customer's payment
          const transaction = new TransactionModel({
            orderId: transactionDetails._id,
          });

          await transaction.save();
        }

        return NextResponse.json(
          {
            message: {
              message: "transaction successful",
              data: transactionDetails,
            },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ message: "order failed" }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "order status" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
