import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { OrderType } from "@/models/OrderModel";
import { Model } from "mongoose";

export class OrderRepository {
  constructor(private readonly Db: Model<OrderType>) {
    this.Db = Db;
  }

  async findByPaginate(user_id: string, pageNumber: number, limits: number) {
    try {
      const page = pageNumber; // Example: the page you want to retrieve
      const limit = limits; // Example: number of documents per page
      const skip = page - 1 * limit;

      const aggregationPipeline = [
        {
          $match: {
            user_id: user_id,
          },
        },

        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            user_id: 1,
            _id: 1,
            tx_ref: 1,
            items: 1,
            payment: 1,
            billing: 1,
            customer: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ];
      const response: OrderType[] = await this.Db.aggregate(
        aggregationPipeline
      );
      return response;
    } catch (error) {
      throw new GlobalErrorHandler("Order fail", "OrderError", "400", true);
    }
  }
}
