import { NextRequest, NextResponse } from "next/server";
import { SuccessApiResponseHelper } from "../utils/ApiResponseHelper";
import Flutterwave from "flutterwave-node-v3";

export async function POST(req: NextRequest) {
  try {
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );
    const payload = await req.json();
    const secretHash = process.env.FLU_VERIFY_HASH;
    const signature = req.headers.get("verif-hash");
    console.log(signature);
    if (!signature || signature !== secretHash) {
      // This request isn't from Flutterwave; discard
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await flw.Transaction.verify({ id: payload.id });
    if (
      response.data.status === "successful" &&
      response.data.amount === payload.amount &&
      response.data.currency === payload.currency
    ) {
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
    } else {
      // Inform the customer their payment was unsuccessful
    }

    // It's a good idea to log all received events.
    console.log(payload);
    // Do something (that doesn't take too long) with the payload
  } catch (error) {}
}
