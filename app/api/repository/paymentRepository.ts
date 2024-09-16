import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { PaymentService } from "../service/PaymentService";
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
        method: "post",
        data: {
          tx_ref: data.tx_ref,
          amount: data.amount,
          currency: data.currency,
          redirect_url: `${process.env.NEXT_PUBLIC_BASEURL}/checkout-outcome`,
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
      const order = new this.OrderModel({
        items: data.item,
        payment: {
          method: "",
          transactionId: data.tx_ref,
          amount: data.amount,
          currency: data.currency,
          status: "Pending",
        },
        billing: {
          tx_ref: data.tx_ref,
          amount: data.amount,
          currency: data.currency,
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
        },
      });
      await order.save();
      const result: FlutterwaveHostedLinkResponse = await response.data;

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // async create(data: PaymentDataType) {
  //   const checkout = await this.paymentService.FlutterCheckout(data);
  //   return checkout;
  // }
}
