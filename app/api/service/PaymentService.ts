import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { paymentRepository } from "../repository/paymentRepository";
import { FlutterwavePayment } from "../utils/FlutterwavePayment";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export class PaymentService {
  FlutterwavePayment: FlutterwavePayment;
  constructor(private readonly paymentRepository: paymentRepository) {
    this.FlutterwavePayment = new FlutterwavePayment();
  }

  async create(data: PaymentDataType) {
    try {
      const order = await this.paymentRepository.create(data);
      const process_payment = await this.FlutterwavePayment.process(data);
      return process_payment;
    } catch (error) {
      console.log(error);
      throw new GlobalErrorHandler("Payment fail", "OrderError", "500", true);
    }
  }
}
