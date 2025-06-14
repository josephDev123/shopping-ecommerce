import { paymentType } from "@/app/types/paymentType";
import { FlutterwavePayment } from "../utils/FlutterwavePayment";
import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";

export class BasePaymentFactory {
  private paymentType: paymentType;
  constructor(paymentType: paymentType) {
    this.paymentType = paymentType;
  }

  async process<T extends PaymentDataType>(payload: T, orderId: string) {
    switch (this.paymentType) {
      case "flutterwave":
        return await FlutterwavePayment.process(payload, orderId);
      // break;

      default:
        throw new Error("Invalid payment type");
    }
  }
}
