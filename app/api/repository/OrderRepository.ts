import { OrderType } from "@/models/OrderModel";
import { Model } from "mongoose";

export class OrderRepository {
  constructor(private readonly Db: Model<OrderType>) {
    this.Db = Db;
  }

  async findByPaginate(id: string, filterBydate: string, pageNumber: number) {
    const page = pageNumber; // Example: the page you want to retrieve
    const limit = 5; // Example: number of documents per page
    const skip = page - 1;

    const aggregationPipeline = [
      {
        $match: {
          _id: id,
        },
      },
      //   {
      //     $sort: {
      //       /* your sorting criteria here, e.g., { _id: 1 } */
      //     },
      //   },

      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          customer: 1,
          total: 1,
          profit: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ];
    const response = await this.Db.aggregate(aggregationPipeline);
    return ["order"];
  }
}
