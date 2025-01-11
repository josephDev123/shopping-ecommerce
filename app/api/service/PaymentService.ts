import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { paymentRepository } from "../repository/paymentRepository";
import { FlutterwavePayment } from "../utils/FlutterwavePayment";

export class PaymentService {
  FlutterwavePayment: FlutterwavePayment;
  constructor(private readonly paymentRepository: paymentRepository) {
    this.FlutterwavePayment = new FlutterwavePayment();
  }

  async create(data: PaymentDataType) {
    try {
      // const checkout = await this.paymentRepository.FlutterCheckout(data);
      const checkout = await this.FlutterwavePayment.process(data);
      return checkout;
    } catch (error) {
      console.log(error);
    }
  }
}
