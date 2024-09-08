import { generateUniquePaymentID } from "@/app/utils/randomCharacters";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  try {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
      url: "https://api.flutterwave.com/v3/payments",
      method: "post",
      data: {
        tx_ref: payload.tx_ref,
        amount: payload.amount,
        currency: payload.currency,
        redirect_url: "http://localhost:3000/success",
        customer: {
          email: payload.customer.email,
          name: payload.customer.name,
          phonenumber: payload.customer.phonenumber,
          companyName: payload.customer.companyName,
          country: payload.customer.country,
          address: payload.customer.address,
          town: payload.customer.town,
          province: payload.customer.province,
          zipCode: payload.customer.zipCode,
          additionalInfo: payload.customer.additionalInfo,
        },
        customizations: {
          title: payload.customizations.title,
        },
      },
    });

    const result = await response.data;

    console.log(result);

    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
