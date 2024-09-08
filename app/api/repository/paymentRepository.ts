import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { PaymentService } from "../service/PaymentService";

export class paymentRepository {
  constructor(private readonly paymentService: PaymentService) {}

  async create(data: PaymentDataType) {
    const checkout = await this.paymentService.FlutterCheckout(data);
    return checkout;
  }
}
