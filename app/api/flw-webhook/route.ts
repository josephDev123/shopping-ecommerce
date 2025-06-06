import { NextRequest, NextResponse } from "next/server";
import { SuccessApiResponseHelper } from "../utils/ApiResponseHelper";
import Flutterwave from "flutterwave-node-v3";
import Flw_Transaction from "@/models/FlwTransactionModel";
import { startDb } from "@/lib/startDb";

export async function POST(req: NextRequest) {
  try {
    await startDb();
    // const flw = new Flutterwave(
    //   process.env.FLUTTERWAVE_PUBLIC_KEY,
    //   process.env.FLUTTERWAVE_SECRET_KEY
    // );

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
    };

    const payload = await req.json();
    // const secretHash = process.env.FLU_VERIFY_HASH;
    // const signature = req.headers.get("verif-hash");
    // console.log(signature);
    // if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // const response = await flw.Transaction.verify({ id: payload.id });
    // if (
    //   response.data.status === "successful" &&
    //   response.data.amount === payload.amount &&
    //   response.data.currency === payload.currency
    // ) {
    // Success! Confirm the customer's payment
    // const existingEvent = await PaymentEvent.where({ id: payload.id }).find();
    // if (existingEvent.status === payload.status) {
    // The status hasn't changed,
    // so it's probably just a duplicate event
    // and we can discard it
    //   SuccessApiResponseHelper(
    //     "success transaction",
    //     "TransactionSuccess",
    //     true,
    //     "success",
    //     200,
    //     ""
    //   );
    // }
    // Record this event
    // await PaymentEvent.save(payload);
    // } else {
    // Inform the customer their payment was unsuccessful
    // }

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

    console.log("flw webhook 2", payload);
    const transaction = new Flw_Transaction(payload);
    await transaction.save();

    return NextResponse.json({ message: "success" }, { status: 200 });

    // Do something (that doesn't take too long) with the payload
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
