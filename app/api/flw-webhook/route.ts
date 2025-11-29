import { NextRequest, NextResponse } from "next/server";
// import { SuccessApiResponseHelper } from "../utils/ApiResponseHelper";
import Flutterwave from "flutterwave-node-v3";
// import Flw_Transaction from "@/models/FlwTransactionModel";
import { startDb } from "@/lib/startDb";
import { PaymentDetails, TransactionModel } from "@/models/TransactionModel";
import OrderModel from "@/models/OrderModel";
import { NotificationRepo } from "../repository/NotificationRepo";
import { NotificationModel } from "@/models/Notification";
import { Notification } from "../service/Notification";
import { ShippingModel, IShippingSchema } from "../shipping/model/Shiping";
import mongoose, { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await startDb();
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );

    type PaymentEvent = {
      event: string;
      data: {
        id: string;
        tx_ref: string;
        flw_ref: string;
        device_fingerprint: string;
        amount: number;
        currency: string;
        charged_amount: number;
        app_fee: number;
        merchant_fee: number;
        processor_response: string;
        auth_model: string;
        ip: string;
        narration: string;
        status: string; // Assuming possible statuses
        payment_type: string; // Assuming possible types
        created_at: string; // ISO date string
        account_id: string;
        customer: {
          id: string;
          name: string;
          phone_number: string;
          email: string;
          created_at: string; // ISO date string
        };
      };
      meta_data: {
        __CheckoutInitAddress: string;
        orderId: string;
        user_id: string;
      };
      "event.type": string;
    };

    const payload: PaymentEvent = await req.json();
    console.log(payload);
    const secretHash = process.env.FLU_WEBHOOK_HASH!;
    const signature = req.headers.get("verif-hash");

    if (!signature || signature !== secretHash) {
      // This request isn't from Flutterwave; discard
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // verify the transaction  after the webhook
    const response = await flw.Transaction.verify({ id: payload.data.id });
    if (
      response.data.status === "successful" &&
      response.data.amount === payload.data.amount &&
      response.data.currency === payload.data.currency
    ) {
      // const existingEvent = await PaymentEvent.where({ id: payload.id }).find();
      // if (existingEvent.status === payload.data.status) {
      // The status hasn't changed, so it's probably just a duplicate event and we can discard it
      //   SuccessApiResponseHelper(
      //     "success transaction",
      //     "TransactionSuccess",
      //     true,
      //     "success",
      //     200,
      //     ""
      //   );
      //   return
      // }
      // Record this event
      // await PaymentEvent.save(payload);

      // It's a good idea to log all received events.
      // console.log("flw webhook", payload);
      // const flwPayload: PaymentEvent = {
      //   event: payload.event,
      //   data: {
      //     id: payload.data.id,
      //     tx_ref: payload.data.tx_ref,
      //     flw_ref: payload.data.flw_ref,
      //     device_fingerprint: payload.data.device_fingerprint,
      //     amount: payload.data.amount,
      //     currency: payload.data.currency,
      //     charged_amount: payload.data.charged_amount,
      //     app_fee: payload.data.app_fee,
      //     merchant_fee: payload.data.merchant_fee,
      //     processor_response: payload.data.processor_response,
      //     auth_model: payload.data.auth_model,
      //     ip: payload.data.ip,
      //     narration: payload.data.narration,
      //     status: payload.data.status,
      //     payment_type: payload.data.payment_type,
      //     created_at: payload.data.created_at,
      //     account_id: payload.data.account_id,
      //     customer: {
      //       id: payload.customer.id,
      //       name: payload.customer.name,
      //       phone_number: payload.customer.phone_number,
      //       email: payload.customer.email,
      //       created_at: payload.customer.created_at,
      //     },
      //   },
      // };

      console.log("verify api", response);
      console.log("webhook payload", payload);
      const paymentDetails: PaymentDetails = {
        amount: payload?.data.amount,
        currency: payload?.data.currency,
        charged_amount: payload?.data.charged_amount,
        app_fee: payload?.data.app_fee,
        merchant_fee: payload?.data.merchant_fee,
        narration: payload?.data.narration,
        status: payload?.data.status,
        payment_type: payload?.data.payment_type,
      };

      console.log("flw webhook ", payload);

      //update the Order order  status
      await OrderModel.updateOne(
        { _id: payload.meta_data.orderId },
        { $set: { order_status: "Processing" } }
      );

      const transaction = new TransactionModel({
        orderId: payload.meta_data.orderId,
        paymentDetails,
      });

      await transaction.save();

      //handle payment successful notification
      const notificationRepoImpl = new NotificationRepo(NotificationModel);
      const notificationService = new Notification(notificationRepoImpl);

      await notificationService.create({
        from: payload.meta_data.user_id,
        label: "payment successful",
        to: payload.meta_data.user_id,
        type: "Transaction",
        link: `/dashboard/transactions`,
      });

      // CREATE THE TRACKING/ SHIPPING HERE
      const Shipping: Partial<IShippingSchema> = {
        transactionId: transaction._id,
        orderId: new mongoose.Types.ObjectId(payload.meta_data.orderId),
      };

      const Tracking = new ShippingModel(Shipping);
      await Tracking.save();

      return NextResponse.json({ message: "success" }, { status: 200 });
    }
    // Do something (that doesn't take too long) with the payload
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
