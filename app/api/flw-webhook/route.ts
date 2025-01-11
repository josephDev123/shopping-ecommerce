import { NextRequest, NextResponse } from "next/server";
import { SuccessApiResponseHelper } from "../utils/ApiResponseHelper";
import Flutterwave from "flutterwave-node-v3";
import Flw_Transaction from "@/models/Flw-transactionModel";
import { startDb } from "@/lib/startDb";

export async function POST(req: NextRequest) {
  try {
    await startDb();
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );
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
    console.log("flw webhook", payload);
    const flwPayload = {
      event: payload.event,
      data: {
        id: payload.id,
        tx_ref: payload.tx_ref,
        flw_ref: payload.flw_ref,
        device_fingerprint: payload.device_fingerprint,
        amount: payload.amount,
        currency: payload.currency,
        charged_amount: payload.charged_amount,
        app_fee: payload.app_fee,
        merchant_fee: payload.merchant_fee,
        processor_response: payload.processor_response,
        auth_model: payload.auth_model,
        ip: payload.ip,
        narration: payload.narration,
        status: payload.status,
        payment_type: payload.payment_type,
        created_at: payload.created_at,
        account_id: payload.account_id,
        customer: {
          id: payload.customer.id,
          name: payload.customer.name,
          phone_number: payload.customer.phone_number,
          email: payload.customer.email,
          created_at: payload.customer.created_at,
        },
      },
    };

    const transaction = new Flw_Transaction(payload);
    await transaction.save();

    return NextResponse.json({ message: "success" }, { status: 200 });

    // Do something (that doesn't take too long) with the payload
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
