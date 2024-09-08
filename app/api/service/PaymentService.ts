import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { FlutterwaveHostedLinkResponse } from "@/app/types/flutterwaveSuccessRedirectType";
import axios from "axios";

export class PaymentService {
  async FlutterCheckout(data: PaymentDataType) {
    try {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
        url: "https://api.flutterwave.com/v3/payments",
        method: "post",
        data: {
          tx_ref: data.tx_ref,
          amount: data.amount,
          currency: data.currency,
          redirect_url: "http://localhost:3000/checkout-outcome",
          customer: {
            email: data.customer.email,
            name: data.customer.name,
            phonenumber: data.customer.phonenumber,
            companyName: data.customer.companyName,
            country: data.customer.country,
            address: data.customer.address,
            town: data.customer.town,
            province: data.customer.province,
            zipCode: data.customer.zipCode,
            additionalInfo: data.customer.additionalInfo,
          },
          customizations: {
            title: data.customizations.title,
          },
        },
      });

      const result: FlutterwaveHostedLinkResponse = await response.data;

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
