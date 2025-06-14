import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { paymentRepository } from "../repository/paymentRepository";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { BasePaymentFactory } from "../factories/BasePayment";
import { OrderType } from "@/models/OrderModel";
import mongoose, { Types } from "mongoose";
import { generateSecureToken } from "@/app/utils/uniqueCryptoCharacter";
import { NotificationFactoryParent } from "../factories/NotificationFactory";

export class PaymentService {
  constructor(
    private readonly paymentRepository: paymentRepository,
    readonly NotificationFactoryParent: NotificationFactoryParent
  ) {}

  async create(data: PaymentDataType) {
    let orderId: any;
    try {
      const BasePaymentFactoryImpl = new BasePaymentFactory("flutterwave");
      const tx_ref = generateSecureToken();
      const formattedPayload = {
        ...data,
        tx_ref,
      };
      // Run all asynchronous operations in parallel using Promise.all
      // const [order, process_payment] = await Promise.all([
      //   this.paymentRepository.create(formattedPayload),
      //   BasePaymentFactoryImpl.process(formattedPayload),
      // ]);

      let order = await this.paymentRepository.create(formattedPayload);
      // await this.NotificationFactoryParent.process({
      //   from: data.user_id,
      //   type: "Order",
      //   to: data.user_id,
      //   data: {
      //     id: String(order?._id),
      //     name: order?.items[0].productName ?? "",
      //     price: order?.items[0].productPrice ?? "",
      //   },
      // });

      if (!order?._id) {
        return new GlobalErrorHandler(
          "Order creation failed",
          "OrderError",
          "500",
          true
        );
      }
      // if (order?._id) {
      const process_payment = await BasePaymentFactoryImpl.process(
        formattedPayload,
        new mongoose.Types.ObjectId(order?._id).toString()
      );
      orderId = order._id;
      return process_payment;
      // }

      console.log(order?._id);
    } catch (error) {
      console.log(error);
      if (orderId?._id) {
        await this.paymentRepository.deleteById(orderId?._id);
      }
      throw new GlobalErrorHandler(
        "Payment/Order fail",
        "OrderError",
        "500",
        true
      );
    }
  }
}
