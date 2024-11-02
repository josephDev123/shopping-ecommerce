import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { TransactionType } from "@/models/TransactionModel";
import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";

export class transactionRepository {
  constructor(private readonly transactionModel: Model<TransactionType>) {
    this.transactionModel = transactionModel;
  }

  async findByPaginate(user_id: string, pageNumber: number, limits: number) {
    try {
      const page = pageNumber;
      const limit = limits;
      const skip = (page - 1) * limit;

      const TransactionAggregationPipeline = [
        {
          $lookup: {
            from: "orders", // Ensure this is the correct collection name for Order
            localField: "orderId",
            foreignField: "_id",
            as: "orderDetails",
          },
        },
        {
          $unwind: "$orderDetails",
        },
        {
          $match: {
            "orderDetails.user_id": new mongoose.Types.ObjectId(user_id),
          },
        },
        { $skip: skip },
        { $limit: limit },
      ];

      const result = await this.transactionModel.aggregate(
        TransactionAggregationPipeline
      );

      return result;
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
