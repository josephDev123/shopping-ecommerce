import { useSearchParams } from "next/navigation";
import Flutterwave from "flutterwave-node-v3";
import { NextRequest, NextResponse } from "next/server";
import { TransactionModel } from "@/models/TransactionModel";
import OrderModel, { OrderType } from "@/models/OrderModel";
import { startDb } from "@/lib/startDb";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const request = req.nextUrl.searchParams;
    const queryStatus = request.get("status");
    const queryTx_ref = request.get("tx_ref");
    const queryTransaction_id = request.get("transaction_id");
    await startDb();
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );

    const OrderDetails = await OrderModel.findOne({
      tx_ref: queryTx_ref,
    });

    return Response.json({
      data: OrderDetails,
    });

    // if (queryStatus === "successful") {
    //   const OrderDetails = await OrderModel.findOne({
    //     tx_ref: queryTx_ref,
    //   });

    // const response = await flw.Transaction.verify({
    //   id: queryTransaction_id,
    // });

    // if (
    //   response.data.status === "successful" &&
    //   response.data.amount === OrderDetails.payment.amount &&
    //   response.data.currency === "NGN"
    // ) {
    //   return Response.json(
    //     {
    //       // message: "success",
    //       data: OrderDetails,
    //     }
    //     // { status: 200 }
    //   );
    // } else {
    //   return Response.json(
    //     { message: "order has credibility issue" }
    //     // { status: 500 }
    //   );
    // }
    // }
  } catch (error) {
    return Response.json({ error });
  }
}
