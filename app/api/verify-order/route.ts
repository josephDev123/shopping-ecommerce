import { useSearchParams } from "next/navigation";
import Flutterwave from "flutterwave-node-v3";
import { NextRequest, NextResponse } from "next/server";
import { TransactionModel } from "@/models/TransactionModel";
import OrderModel, { OrderType } from "@/models/OrderModel";
import { startDb } from "@/lib/startDb";

// export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  // const request = req.nextUrl;
  // const queryStatus = request.searchParams.get("status");
  // const queryTx_ref = request.searchParams.get("tx_ref");
  // const queryTransaction_id = request.searchParams.get("transaction_id");
  try {
    // await startDb();
    // const flw = new Flutterwave(
    //   process.env.FLUTTERWAVE_PUBLIC_KEY,
    //   process.env.FLUTTERWAVE_SECRET_KEY
    // );

    // console.log(queryStatus, queryTx_ref, queryTransaction_id);
    return Response.json({
      data: "hello",
    });
    // if (queryStatus === "successful") {
    //   const OrderDetails = await OrderModel.findOne({
    //     tx_ref: queryTx_ref,
    //   });
    // const response = await flw.Transaction.verify({
    //   id: queryTransaction_id,
    // });

    // console.log("orders", OrderDetails);

    // console.log("response", response);

    // if (
    //   response.data.status === "successful" &&
    //   response.data.amount === OrderDetails.payment.amount &&
    //   response.data.currency === "NGN"
    // ) {
    //   return NextResponse.json(
    //     {
    //       message: "success",
    //       data: {
    //         queryStatus,
    //         queryTx_ref,
    //         queryTransaction_id,
    //       },
    //     },
    //     { status: 200 }
    //   );
    // } else {
    //   return NextResponse.json(
    //     { message: "order has credibility issue" },
    //     { status: 500 }
    //   );
    // }
    // }
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" });
  }
}
