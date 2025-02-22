import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { paymentRepository } from "../repository/paymentRepository";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { BasePaymentFactory } from "../factories/BasePayment";

export class PaymentService {
  constructor(private readonly paymentRepository: paymentRepository) {}

  async create(data: PaymentDataType) {
    try {
      const BasePaymentFactoryImpl = new BasePaymentFactory("flutterwave");
      const tx_ref = `${data.user_id}/${data.tx_ref}`;
      const formattedPayload = {
        ...data,
        tx_ref,
      };
      // Run all asynchronous operations in parallel using Promise.all
      const [order, process_payment] = await Promise.all([
        this.paymentRepository.create(formattedPayload),
        BasePaymentFactoryImpl.process(formattedPayload),
      ]);
      console.log(process_payment);
      return process_payment;
    } catch (error) {
      console.log(error);
      throw new GlobalErrorHandler(
        "Payment/Order fail",
        "OrderError",
        "500",
        true
      );
    }
  }
}
