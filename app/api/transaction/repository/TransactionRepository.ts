import { TransactionServerResponseType } from "@/app/types/TransactionType";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { TransactionType } from "@/app/api/transaction/model/TransactionModel";
// import { TransactionType } from "@/models/TransactionModel";
// import Flw_Transaction, { TransactionType } from "@/models/FlwTransactionModel";
import mongoose, { Model, Types } from "mongoose";
import { ITransactionData, ITransactionDTO } from "../../DTO/transactionDTO";

export class transactionRepository {
  constructor(private readonly transactionModel: Model<TransactionType>) {}

  async findByPaginate(user_id: string, pageNumber: number, limits: number) {
    try {
      const page = pageNumber;
      const limit = limits;
      const skip = (page - 1) * limit;

      const TransactionAggregationPipeline = [
        // Join with the Order collection using orderId
        {
          $lookup: {
            from: "orders", // collection name (not model name)
            localField: "orderId",
            foreignField: "_id",
            as: "order",
          },
        },
        // Unwind the order array
        {
          $unwind: "$order",
        },
        // Filter by user_id in the joined order
        {
          $match: {
            "order.user_id": new mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $facet: {
            transactionData: [{ $skip: skip }, { $limit: limit }],
            totalTransaction: [{ $count: "totalTransactionCount" }],
          },
        },
      ];

      const result = await this.transactionModel.aggregate(
        TransactionAggregationPipeline
      );

      const totalTransaction =
        result[0]?.totalTransaction[0]?.totalTransactionCount || 0;
      const transactionData = result[0]?.transactionData || [];
      // console.log("transactionData", result);

      const transactionDataDTO: ITransactionDTO[] = transactionData.map(
        (item: ITransactionDTO): ITransactionDTO => ({
          _id: item._id,
          orderId: item.orderId,
          paymentDetails: {
            amount: item.paymentDetails.amount,
            currency: item.paymentDetails.currency,
            charged_amount: item.paymentDetails.charged_amount,
            app_fee: item.paymentDetails.app_fee,
            merchant_fee: item.paymentDetails.merchant_fee,
            narration: item.paymentDetails.narration,
            status: item.paymentDetails.status,
            payment_type: item.paymentDetails.payment_type,
          },
          order: {
            // _id: item.order._id,

            tx_ref: item.order.tx_ref,
            items: item.order.items.map((product: any) => ({
              qty: product.qty,
              productName: product.productName,
              // Description: product.Description,
              // productQuantity: product.productQuantity,
              // productSize: product.productSize,
              productImgUrl: product.productImgUrl.map((img: any) => ({
                url: img.url,
                path: img.path,
              })),
              _id: product._id,
            })),
            billing: {
              amount: item.order.billing.amount,
              currency: item.order.billing.currency,
            },
            customer: {
              email: item.order.customer.email,
              name: item.order.customer.name,
              phonenumber: item.order.customer.phonenumber,
              country: item.order.customer.country,
              address: item.order.customer.address,
            },
            order_status: item.order.order_status,
            createdAt: item.order.createdAt,
            updatedAt: item.order.updatedAt,
          },
        })
      );

      return {
        totalCount: totalTransaction,
        transactionData: transactionDataDTO,
      } as ITransactionData;
    } catch (error) {
      throw new GlobalErrorHandler(
        "Something went wrong",
        "TransactionRepoError",
        "500",
        true
      );
    }
  }
}
