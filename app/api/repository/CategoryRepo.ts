import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { OrderType } from "@/models/OrderModel";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import mongoose, { Model } from "mongoose";

export class categoryRepository {
  constructor(
    private readonly dbContext: Model<OrderType>,
    private readonly ProductDbContext: Model<ProductSchemaTypes>
  ) {}

  async getCategories(pageNumber: number, limits: number) {
    try {
      const page = pageNumber;
      const limit = limits;
      const skip = (page - 1) * limit;
      const groupedProductsByCategoryPipeline = [
        { $limit: limit },
        { $skip: skip },
        {
          $group: {
            _id: "$productCategory",
            products: {
              $push: {
                id: "$_id",
                productName: "$productName",
                Description: "$Description",
                productTag: "$productTag",
                productPrice: "$productPrice",
                productDiscount: "$productDiscount",
                productQuantity: "$productQuantity",
                productSKU: "$productSKU",
                productSize: "$productSize",
                productColor: "$productColor",
                productItemWeight: "$productItemWeight",
                productUnit: "$productUnit",
                productBreath: "$productBreath",
                productLength: "$productLength",
                productWidth: "$productWidth",
                productImgUrl: "$productImgUrl",
              },
            },
          },
        },
      ];

      const response = await this.ProductDbContext.aggregate(
        groupedProductsByCategoryPipeline
      );
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
  async getUserCategoriesByPaginate(
    pageNumber: number,
    limits: number,
    user_id: string
  ) {
    try {
      const page = pageNumber;
      const limit = limits;
      const skip = (page - 1) * limit;
      const groupedProductsByCategoryPipeline = [
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(user_id),
          },
        },

        { $unwind: "$productCategory" },

        { $limit: limit },
        { $skip: skip },
        {
          $group: {
            _id: "$productCategory",
            products: {
              $push: {
                id: "$_id",
                productName: "$productName",
                Description: "$Description",
                productTag: "$productTag",
                productPrice: "$productPrice",
                productDiscount: "$productDiscount",
                productQuantity: "$productQuantity",
                productSKU: "$productSKU",
                productSize: "$productSize",
                productColor: "$productColor",
                productItemWeight: "$productItemWeight",
                productUnit: "$productUnit",
                productBreath: "$productBreath",
                productLength: "$productLength",
                productWidth: "$productWidth",
                productImgUrl: "$productImgUrl",
              },
            },
          },
        },
      ];

      const response = await this.dbContext.aggregate(
        groupedProductsByCategoryPipeline
      );
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
