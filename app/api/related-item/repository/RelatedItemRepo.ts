import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ProductSchemaTypes } from "@/app/api/product/model/ProductsModel";
import { Model } from "mongoose";

export class RelatedItemRepo {
  constructor(private readonly RelatedItem: Model<ProductSchemaTypes>) {}

  async find(skip: number, limit: number, category: string) {
    try {
      const [result] = await this.RelatedItem.aggregate([
        {
          $match: {
            productCategory: category,
          },
        },

        { $sort: { createdAt: -1 } },

        {
          $facet: {
            items: [{ $skip: skip }, { $limit: limit }],
            total: [{ $count: "count" }],
          },
        },
      ]);

      const items = result.items;
      console.log("related", items);
      const total = result.total[0]?.count ?? 0;

      return { items, total };
    } catch (error) {
      throw new GlobalErrorHandler(
        "Related item fail",
        "RelateItemError",
        "400",
        true
      );
    }
  }
}
