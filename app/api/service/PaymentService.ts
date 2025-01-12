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
      const tx_ref = `${data.user_id}/${data.tx_ref}`;
      const formattedPayload = {
        ...data,
        tx_ref,
      };
      // Run all asynchronous operations in parallel using Promise.all
      const [order, process_payment] = await Promise.all([
        this.paymentRepository.create(formattedPayload),
        this.FlutterwavePayment.process(formattedPayload),
      ]);

      // If everything succeeds, return the desired result
      console.log("Order created:", order);
      console.log("Payment processed:", process_payment);
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
