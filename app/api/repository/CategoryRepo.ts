import { CategoryType } from "@/app/types/categoryType";
import { IdbCategoriesPurchasedType } from "@/app/types/DbResultType";
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
      // const groupedProductsByCategoryPipeline = [
      //   { $limit: limit },
      //   { $skip: skip },
      //   {
      //     $group: {
      //       _id: "$productCategory",
      //       products: {
      //         $push: {
      //           id: "$_id",
      //           productName: "$productName",
      //           Description: "$Description",
      //           productTag: "$productTag",
      //           productPrice: "$productPrice",
      //           productDiscount: "$productDiscount",
      //           productQuantity: "$productQuantity",
      //           productSKU: "$productSKU",
      //           productSize: "$productSize",
      //           productColor: "$productColor",
      //           productItemWeight: "$productItemWeight",
      //           productUnit: "$productUnit",
      //           productBreath: "$productBreath",
      //           productLength: "$productLength",
      //           productWidth: "$productWidth",
      //           productImgUrl: "$productImgUrl",
      //         },
      //       },
      //     },
      //   },
      // ];

      const groupedProductsByCategoryPipeline = [
        {
          $facet: {
            categoriesByGroup: [
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
            ],
            totalCount: [
              {
                $count: "totalCount",
              },
            ],
          },
        },
      ];
      const result = await this.ProductDbContext.aggregate(
        groupedProductsByCategoryPipeline
      );
      // Extract the data
      const response = result[0]?.categoriesByGroup || [];
      const totalCategories = result[0]?.totalCount[0]?.totalCount || 0;
      return {
        totalCategories,
        categoriesGroup: response,
      };
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
  ): Promise<IdbCategoriesPurchasedType> {
    try {
      const page = pageNumber;
      const limit = limits;
      const skip = (page - 1) * limit;
      // const groupedProductsByCategoryPipeline = [
      //   {
      //     $match: {
      //       user_id: new mongoose.Types.ObjectId(user_id),
      //     },
      //   },

      //   { $unwind: "$items" },

      //   {
      //     $group: {
      //       _id: "$items.productCategory",
      //       products: {
      //         $push: {
      //           id: "$_id",
      //           productName: "$items.productName",
      //           Description: "$items.Description",
      //           productTag: "$items.productTag",
      //           productPrice: "$items.productPrice",
      //           productDiscount: "$items.productDiscount",
      //           productQuantity: "$items.productQuantity",
      //           productSKU: "$items.productSKU",
      //           productSize: "$items.productSize",
      //           productColor: "$items.productColor",
      //           productItemWeight: "$items.productItemWeight",
      //           productUnit: "$items.productUnit",
      //           productBreath: "$items.productBreath",
      //           productLength: "$items.productLength",
      //           productWidth: "$items.productWidth",
      //           productImgUrl: "$items.productImgUrl",
      //         },
      //       },
      //     },
      //   },
      //   { $limit: limit },
      //   { $skip: skip },
      // ];
      const groupedProductsByUserPurchasedCategoryPipeline = [
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $facet: {
            categoryOfProductPurchased: [
              { $unwind: "$items" },
              {
                $group: {
                  _id: "$items.productCategory",
                  products: {
                    $push: {
                      id: "$_id",
                      productName: "$items.productName",
                      Description: "$items.Description",
                      productTag: "$items.productTag",
                      productPrice: "$items.productPrice",
                      productDiscount: "$items.productDiscount",
                      productQuantity: "$items.productQuantity",
                      productSKU: "$items.productSKU",
                      productSize: "$items.productSize",
                      productColor: "$items.productColor",
                      productItemWeight: "$items.productItemWeight",
                      productUnit: "$items.productUnit",
                      productBreath: "$items.productBreath",
                      productLength: "$items.productLength",
                      productWidth: "$items.productWidth",
                      productImgUrl: "$items.productImgUrl",
                    },
                  },
                },
              },
              { $limit: limit },
              { $skip: skip },
            ],
            totalCount: [
              {
                $count: "totalCount",
              },
            ],
          },
        },
      ];
      const result = await this.dbContext.aggregate(
        groupedProductsByUserPurchasedCategoryPipeline
      );
      // Extract the data
      const response = result[0]?.categoryOfProductPurchased || [];
      const totalPurchaseCategoryCount =
        result[0]?.totalCount[0]?.totalCount || 0;
      return {
        totalPurchaseCategoryCount,
        categoryPurchased: response,
      };
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
