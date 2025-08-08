import { PaymentDataType } from "@/app/types/flutterwaverRequestDataType";
import { paymentRepository } from "../repository/paymentRepository";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { BasePaymentFactory } from "../factories/BasePayment";
import { OrderType } from "@/models/OrderModel";
import mongoose, { Types } from "mongoose";
import { generateSecureToken } from "@/app/utils/uniqueCryptoCharacter";
import { NotificationFactoryBase } from "../factories/NotificationFactoryBase";
import { NotificationRepo } from "../repository/NotificationRepo";

export class PaymentService {
  constructor(
    private readonly paymentRepository: paymentRepository,
    readonly NotificationFactoryBase: NotificationFactoryBase,
    private readonly NotificationRepo: NotificationRepo
  ) {}

  async create(data: PaymentDataType) {
    let orderId: string | null = null;
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

      if (!order?._id) {
        throw new GlobalErrorHandler(
          "Order creation failed",
          "OrderError",
          "500",
          true
        );
      }

      // notification by BullMQ
      // await this.NotificationFactoryBase.process({
      //   label: "Created Order",
      //   from: data.user_id,
      //   type: "Order",
      //   to: data.user_id,
      //   metadata: {
      //     id: String(order?._id),
      //     name: order?.items[0].productName ?? "",
      //     price: order?.items[0].productPrice ?? "",
      //   },
      // });

      // notification by polling
      await this.NotificationRepo.create({
        label: "Created Order",
        from: data.user_id,
        type: "Order",
        to: data.user_id,
        metadata: {
          id: String(order?._id),
          name: order?.items[0].productName ?? "",
          price: order?.items[0].productPrice ?? "",
        },
      });

      const process_payment = await BasePaymentFactoryImpl.process(
        formattedPayload,
        new mongoose.Types.ObjectId(order?._id).toString()
      );
      //if  the payment fail, set the already store order id to be delete
      if (!process_payment) {
        orderId = String(order._id);
        throw new GlobalErrorHandler(
          "payment failed",
          "PaymentError",
          "500",
          true
        );
      }

      return process_payment;
      // }
    } catch (error) {
      console.log(error);
      if (orderId) {
        await this.paymentRepository.deleteById(orderId);
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
