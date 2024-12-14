import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { FlutterwaveHostedLinkResponse } from "@/app/types/flutterwaveSuccessRedirectType";
import axios from "axios";
import { Model } from "mongoose";
import { OrderType } from "@/models/OrderModel";

export class paymentRepository {
  constructor(private readonly OrderModel: Model<OrderType>) {}

  async FlutterCheckout(data: PaymentDataType) {
    try {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
        url: "https://api.flutterwave.com/v3/payments",
        method: "POST",
        data: {
          user_id: data.user_id,
          tx_ref: data.tx_ref,
          amount: data.amount,
          currency: data.currency,
          redirect_url: `${process.env.NEXT_PUBLIC_BASEURL}/order-outcome`,
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
      console.log(data);

      const order = new this.OrderModel({
        user_id: data.user_id,
        tx_ref: data.tx_ref,
        items: data.item,
        payment: {
          method: data.customer_billing.paymentMethod,
          amount: data.amount,
          currency: data.currency,
          status: "Pending",
        },
        billing: {
          amount: data.amount,
          currency: data.currency,
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
      });
      await order.save();
      const result: FlutterwaveHostedLinkResponse = await response.data;
      console.log("from checkout", result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
