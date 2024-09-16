import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { FlutterwaveHostedLinkResponse } from "@/app/types/flutterwaveSuccessRedirectType";
import axios from "axios";
import { paymentRepository } from "../repository/paymentRepository";

export class PaymentService {
  constructor(private readonly paymentRepository: paymentRepository) {}
  // async FlutterCheckout(data: PaymentDataType) {
  //   try {
  //     const response = await axios({
  //       headers: {
  //         Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
  //       },
  //       url: "https://api.flutterwave.com/v3/payments",
  //       method: "post",
  //       data: {
  //         tx_ref: data.tx_ref,
  //         amount: data.amount,
  //         currency: data.currency,
  //         redirect_url: `${process.env.NEXT_PUBLIC_BASEURL}/checkout-outcome`,
  //         customer: {
  //           email: data.customer.email,
  //           name: data.customer.name,
  //           phonenumber: data.customer.phonenumber,
  //           companyName: data.customer.companyName,
  //           country: data.customer.country,
  //           address: data.customer.address,
  //           town: data.customer.town,
  //           province: data.customer.province,
  //           zipCode: data.customer.zipCode,
  //           additionalInfo: data.customer.additionalInfo,
  //         },
  //         customizations: {
  //           title: data.customizations.title,
  //         },
  //       },
  //     });

  //     const result: FlutterwaveHostedLinkResponse = await response.data;

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async create(data: PaymentDataType) {
    try {
      const checkout = await this.paymentRepository.FlutterCheckout(data);
      return checkout;
    } catch (error) {
      console.log(error);
    }
  }
}
