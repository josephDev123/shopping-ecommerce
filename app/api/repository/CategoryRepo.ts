import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { OrderType } from "@/models/OrderModel";
import mongoose, { Model } from "mongoose";

export class categoryRepository {
  constructor(private readonly dbContext: Model<OrderType>) {}
  async getCategoriesByPaginate(page: number, limit: number, user_id: string) {
    try {
      const groupedProductsPipeline = [
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(user_id),
          },
        },

        // { $limit: 0 },
        // { $skip: 0 },
        // {
        // $group: {
        //   _id: "$productCategory",
        // products: {
        //   $push: {
        //     id: "$_id",
        //     productName: "$productName",
        //     Description: "$Description",
        //     productTag: "$productTag",
        //     productPrice: "$productPrice",
        //     productDiscount: "$productDiscount",
        //     productQuantity: "$productQuantity",
        //     productSKU: "$productSKU",
        //     productSize: "$productSize",
        //     productColor: "$productColor",
        //     productItemWeight: "$productItemWeight",
        //     productUnit: "$productUnit",
        //     productBreath: "$productBreath",
        //     productLength: "$productLength",
        //     productWidth: "$productWidth",
        //     productImgUrl: "$productImgUrl",
        //   },
        // },
        // },
        // },
      ];

      const response = await this.dbContext.aggregate(groupedProductsPipeline);
      return response;
    } catch (error) {
      const errorObj = error as GlobalErrorHandler;

      throw new GlobalErrorHandler(
        errorObj.message,
        "CategoryError",
        "500",
        true
      );
    }
  }
}
