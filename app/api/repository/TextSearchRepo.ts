import { ProductSchemaTypes } from "@/models/ProductsModel";
import { Model } from "mongoose";

export class TextSearchRepo {
  constructor(private readonly ProductDb: Model<ProductSchemaTypes>) {}
  async search(text: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    try {
      const pipeline = [
        {
          $search: {
            index: "default",
            text: {
              query: text,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            productName: 1,
            Description: 1,
            productCategory: 1,
            productTag: 1,
            productPrice: 1,
            productDiscount: 1,
            productSKU: 1,
          },
        },
      ];
      const response = await this.ProductDb.aggregate(pipeline);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
