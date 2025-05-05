import { TransactionServerResponseType } from "@/app/types/TransactionType";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { TransactionType } from "@/models/TransactionModel";
// import { TransactionType } from "@/models/TransactionModel";
// import Flw_Transaction, { TransactionType } from "@/models/FlwTransactionModel";
import mongoose, { Model, Types } from "mongoose";

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
      console.log("transactionData", result);

      return {
        totalCount: totalTransaction,
        transactionData,
      };
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
