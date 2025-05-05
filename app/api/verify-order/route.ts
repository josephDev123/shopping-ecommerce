import Flutterwave from "flutterwave-node-v3";
import { type NextRequest } from "next/server";
import { PaymentDetails, TransactionModel } from "@/models/TransactionModel";
import OrderModel, { OrderType } from "@/models/OrderModel";
import { startDb } from "@/lib/startDb";

// export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await startDb();
    const searchParams = req.nextUrl.searchParams;
    const queryStatus = searchParams.get("status");
    const queryTx_ref = searchParams.get("tx_ref");
    const queryTransaction_id = searchParams.get("transaction_id");

    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY!,
      process.env.FLUTTERWAVE_SECRET_KEY!
    );

    const verifyResponse = await flw.Transaction.verify({
      id: queryTransaction_id,
    });

    const OrderDetails = await OrderModel.findOne({
      tx_ref: queryTx_ref,
    });

    if (
      verifyResponse.data.status === "successful" &&
      verifyResponse.data.amount === OrderDetails.payment.amount &&
      verifyResponse.data.currency === "NGN"
    ) {
      const paymentDetails: PaymentDetails = {
        amount: verifyResponse?.data.amount,
        currency: verifyResponse?.data.currency,
        charged_amount: verifyResponse?.data.charged_amount,
        app_fee: verifyResponse?.data.app_fee,
        merchant_fee: verifyResponse?.data.merchant_fee,
        narration: verifyResponse?.data.narration,
        status: verifyResponse?.data.status,
        payment_type: verifyResponse?.data.payment_type,
      };
      const transaction = new TransactionModel({
        orderId: OrderDetails._id,
        paymentDetails,
      });

      await transaction.save();

      return Response.json(
        {
          OrderDetails,
          paymentDetails,
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "order has credibility issue" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error from transaction", error);
    return Response.json({ error: error }, { status: 500 });
  }
}
