import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { FlutterwaveHostedLinkResponse } from "@/app/types/flutterwaveSuccessRedirectType";
import axios from "axios";

export class FlutterwavePayment {
  static async process(
    data: PaymentDataType
    // payload2: string
  ): Promise<FlutterwaveHostedLinkResponse | null> {
    try {
      // console.log("payload", payload2);
      const response = await axios({
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
        url: "https://api.flutterwave.com/v3/payments",
        method: "POST",
        data: {
          user_id: data.user_id,
          // tx_ref: data.tx_ref,
          tx_ref: data.tx_ref,
          amount: data.amount,
          currency: data.currency,
          redirect_url: `${process.env.NEXT_PUBLIC_BASEURL}/order-outcome`,
          json: {
            payment_options: "card, ussd, mobilemoneyghana",
          },
          customer: {
            email: data.customer_billing.email,
            name: data.customer_billing.name,
            phonenumber: data.customer_billing.phonenumber,
            companyName: data.customer_billing.companyName,
            country: data.customer_billing.country,
            address: data.customer_billing.address,
            town: data.customer_billing.town,
            province: data.customer_billing.province,
            zipCode: data.customer_billing.zipCode,
            additionalInfo: data.customer_billing.additionalInfo,
          },
          customizations: {
            title: data.customizations.title,
          },
        },
      });

      return response.data as FlutterwaveHostedLinkResponse; // ✅ Return proper response
    } catch (error: any) {
      console.error(
        "Flutterwave Payment Error:",
        error?.response?.data || error.message
      );
      return null; // ✅ Ensure function always returns something
    }
  }
}
