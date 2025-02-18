import Flutterwave from "flutterwave-node-v3";
import { type NextRequest } from "next/server";
import { TransactionModel } from "@/models/TransactionModel";
import OrderModel, { OrderType } from "@/models/OrderModel";
import { startDb } from "@/lib/startDb";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    // await startDb();
    const searchParams = req.nextUrl.searchParams;
    // const { searchParams } = new URL(req.url);
    const queryStatus = searchParams.get("status");
    const queryTx_ref = searchParams.get("tx_ref");
    const queryTransaction_id = searchParams.get("transaction_id");

    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );

    console.log(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );

    // const OrderDetails = await OrderModel.findOne({
    //   tx_ref: queryTx_ref,
    // });

    return Response.json(
      {
        data: "data from api",
      },
      { status: 200 }
    );

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
    return Response.json({ error: error }, { status: 500 });
  }
}
