import { IdbOrderType } from "@/app/types/DbResultType";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { OrderType } from "@/app/api/orders/model/OrderModel";
import mongoose, { Model } from "mongoose";

export class OrderRepository {
  constructor(private readonly Order: Model<OrderType>) {
    this.Order = Order;
  }

  async findByPaginate(
    user_id: string,
    pageNumber: number,
    limits: number
  ): Promise<IdbOrderType> {
    try {
      const page = pageNumber; // Example: the page you want to retrieve
      const limit = limits; // Example: number of documents per page
      const skip = (page - 1) * limit;

      // const aggregationPipeline = [
      //   {
      //     $match: {
      //       user_id: new mongoose.Types.ObjectId(user_id),
      //     },
      //   },

      //   { $skip: skip },
      //   { $limit: limit },
      //   {
      //     $project: {
      //       user_id: 1,
      //       _id: 1,
      //       tx_ref: 1,
      //       items: 1,
      //       payment: 1,
      //       billing: 1,
      //       customer: 1,
      //       createdAt: 1,
      //       updatedAt: 1,
      //     },
      //   },
      // ];

      // console.log("pipeline", aggregationPipeline);
      const aggregationPipeline = [
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $facet: {
            paginatedResults: [
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
                  order_status: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
            ],
            totalCount: [{ $count: "total" }],
          },
        },
      ];

      const result = await this.Order.aggregate(aggregationPipeline);

      // Extract the data
      const response = result[0]?.paginatedResults || [];
      const totalOrders = result[0]?.totalCount[0]?.total || 0;
      return {
        totalOrders,
        orders: response,
      };
      // return response;
    } catch (error) {
      throw new GlobalErrorHandler("Order fail", "OrderError", "400", true);
    }
  }
}
