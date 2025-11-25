import { Model } from "mongoose";
import { IShipping } from "../zod/ShippingSchema";
import { IShippingSchema } from "@/models/Shiping";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";

export class ShippingRepo {
  constructor(private readonly db: Model<IShippingSchema>) {}

  async create(payload: IShipping) {
    try {
      const CreateShippingQuery = new this.db(payload);
      await CreateShippingQuery.save();
      return;
    } catch (error) {
      console.log(error);
      if (error instanceof GlobalErrorHandler) {
        throw new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "400", false);
      }

      throw new GlobalErrorHandler(
        "Something went wrong",
        "UnknownError",
        "500",
        false
      );
    }
  }

  async getAll(page: number, limit: number) {
    try {
      const offset = (page - 1) * limit;

      const result = await this.db.aggregate([
        {
          $facet: {
            data: [
              { $sort: { createdAt: -1 } },
              { $skip: offset },
              { $limit: limit },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ]);

      const shippings: IShippingSchema[] = result[0].data || [];
      const total = result[0].totalCount[0]?.count || 0;

      return {
        data: shippings,
        totalCount: total,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof GlobalErrorHandler) {
        throw new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }
      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "400", false);
      }

      throw new GlobalErrorHandler(
        "Something went wrong",
        "UnknownError",
        "500",
        false
      );
    }
  }
}
