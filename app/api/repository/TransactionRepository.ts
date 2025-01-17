import { TransactionServerResponseType } from "@/app/types/TransactionSeverResponseType";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
// import { TransactionType } from "@/models/TransactionModel";
import Flw_Transaction, { TransactionType } from "@/models/FlwTransactionModel";
import { Model } from "mongoose";

export class transactionRepository {
  constructor(private readonly transactionModel: Model<TransactionType>) {
    // this.transactionModel = transactionModel;
  }

  async findByPaginate(user_id: string, pageNumber: number, limits: number) {
    try {
      const page = pageNumber;
      const limit = limits;
      const skip = (page - 1) * limit;
      const Transactions = await this.transactionModel.find({
        "data.tx_ref": { $regex: `^${user_id}/` },
      });
      // console.log("from transaction", Transactions);
      return Transactions;

      // const TransactionAggregationPipeline = [
      //   {
      //     $match: {
      //       "data.tx_ref": { $regex: `^${user_id}/` },
      //     },
      //   },
      // ];

      // const TransactionAggregationPipeline = [
      //   {
      //     $facet: {
      //       transactionData: [
      //         {
      //           $lookup: {
      //             from: "orders", // Ensure this is the correct collection name for Order
      //             localField: "orderId",
      //             foreignField: "_id",
      //             as: "orderDetails",
      //           },
      //         },
      //         {
      //           $unwind: "$orderDetails",
      //         },
      //         {
      //           $match: {
      //             "orderDetails.user_id": new mongoose.Types.ObjectId(user_id),
      //           },
      //         },
      //         { $skip: skip },
      //         { $limit: limit },
      //       ],
      //       totalTransaction: [
      //         {
      //           $count: "totalTransactionCount",
      //         },
      //       ],
      //     },
      //   },
      // ];

      // const result = await this.transactionModel.aggregate(
      //   TransactionAggregationPipeline
      // );

      // const totalTransaction =
      //   result[0]?.totalTransaction[0]?.totalTransactionCount || 0;
      // const transactionData: TransactionServerResponseType[] =
      //   result[0]?.transactionData || [];

      // return {
      //   totalCount: totalTransaction,
      //   transactionData,
      // };
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
