import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { OrderType } from "@/models/OrderModel";
import { Model, Types } from "mongoose";

export class DashboardOverviewRepo {
  constructor(private readonly OrderModel: Model<OrderType>) {}

  async getDashboardStats(payload: string) {
    try {
      const userId = new Types.ObjectId(payload);

      const result = await this.OrderModel.aggregate([
        { $match: { user_id: userId } },
        {
          $facet: {
            totalOrders: [{ $count: "count" }],
            latestCustomers: [
              { $sort: { createdAt: -1 } },
              { $limit: 8 },
              { $project: { customer: 1, _id: 0 } },
            ],
            mostBoughtCategories: [
              { $unwind: "$items" },
              { $group: { _id: "$items.productCategory", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 8 },
            ],
            latestOrders: [{ $sort: { createdAt: -1 } }, { $limit: 10 }],
          },
        },
      ]);

      return {
        totalOrders: result[0].totalOrders[0]?.count || 0,
        latestCustomers: result[0].latestCustomers,
        mostBoughtCategories: result[0].mostBoughtCategories,
        latestOrders: result[0].latestOrders,
      };
    } catch (error) {
      if (error instanceof GlobalErrorHandler) {
        return new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }

      if (error instanceof Error) {
        return new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      return new GlobalErrorHandler(
        "something went wrong",
        "ServerError",
        "500",
        false
      );
    }
  }
}
