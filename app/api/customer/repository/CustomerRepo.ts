import { IdbCustomerType } from "@/app/types/DbResultType";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { OrderType } from "@/app/api/orders/model/OrderModel";
import mongoose, { Model } from "mongoose";

export class CustomerRepo {
  constructor(private readonly Db: Model<OrderType>) {
    this.Db = Db;
  }

  async findByPaginate(
    user_id: string,
    pageNumber: number,
    limits: number
  ): Promise<IdbCustomerType> {
    try {
      const page = pageNumber;
      const limit = limits;
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

      const customerAggregatePipeline = [
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(user_id),
          },
        },

        {
          $facet: {
            customer: [
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
            ],
            totalCount: [
              {
                $count: "totalCount",
              },
            ],
          },
        },
      ];

      // console.log("pipeline", aggregationPipeline);
      const result = await this.Db.aggregate(customerAggregatePipeline);

      // Extract the data
      const response = result[0]?.customer || [];
      const totalCustomer = result[0]?.totalCount[0]?.totalCount || 0;
      return {
        totalCustomer,
        customers: response,
      };
    } catch (error) {
      throw new GlobalErrorHandler("Order fail", "OrderError", "400", true);
    }
  }
}
