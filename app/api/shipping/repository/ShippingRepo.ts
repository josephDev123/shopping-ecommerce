import mongoose, { Model } from "mongoose";
import { IShipping } from "../zod/ShippingSchema";
import { IShippingSchema } from "../model/Shiping";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { Session } from "next-auth";

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

  // async getAll(page: number, limit: number) {
  //   try {
  //     const offset = (page - 1) * limit;

  //     const result = await this.db.aggregate([
  //       {
  //         $facet: {
  //           data: [
  //             { $sort: { createdAt: -1 } },
  //             { $skip: offset },
  //             { $limit: limit },
  //             populate("orderId")
  //           ],
  //           totalCount: [{ $count: "count" }],
  //         },
  //       },
  //     ]);

  //     const shippings: IShippingSchema[] = result[0].data || [];
  //     const total = result[0].totalCount[0]?.count || 0;

  //     return {
  //       data: shippings,
  //       totalCount: total,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     if (error instanceof GlobalErrorHandler) {
  //       throw new GlobalErrorHandler(
  //         error.message,
  //         error.name,
  //         error.code,
  //         error.operational
  //       );
  //     }
  //     if (error instanceof Error) {
  //       throw new GlobalErrorHandler(error.message, error.name, "400", false);
  //     }

  //     throw new GlobalErrorHandler(
  //       "Something went wrong",
  //       "UnknownError",
  //       "500",
  //       false
  //     );
  //   }
  // }

  async getAll(page: number, limit: number, userSession: Session) {
    try {
      const offset = (page - 1) * limit;

      const result = await this.db.aggregate([
        {
          $facet: {
            data: [
              {
                $match: {
                  userId: new mongoose.Types.ObjectId(userSession.user.id),
                },
              },
              { $sort: { createdAt: -1 } },
              { $skip: offset },
              { $limit: limit },
              {
                $lookup: {
                  from: "orders",
                  localField: "orderId",
                  foreignField: "_id",
                  as: "order",
                },
              },
              {
                $unwind: {
                  path: "$order",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "transactions", // Collection name in DB (lowercase, pluralized by Mongoose)
                  localField: "transactionId",
                  foreignField: "_id",
                  as: "transaction", // Populated field name
                },
              },
              {
                $unwind: {
                  path: "$transaction",
                  preserveNullAndEmptyArrays: true, // Keep shipping even if order is missing
                },
              },

              {
                $project: {
                  transaction: 1,
                  // items: "$order.items",
                  customer: "$order.customer",
                  items: {
                    $map: {
                      input: "$order.items",
                      as: "item",
                      in: {
                        productName: "$$item.productName",
                        productSKU: "$$item.productSKU",
                        productCategory: "$$item.productCategory",
                        qty: "$$item.qty",
                        Description: "$$item.Description",
                        productImgUrl: "$$item.productImgUrl",
                      },
                    },
                  },
                  trackingNumber: 1,
                  carrier: 1,
                  shippingMethod: 1,
                  estimatedDeliveryDate: 1,
                  actualDeliveryDate: 1,
                  status: 1,
                  deliveryNotes: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ]);

      const shippings = result[0].data || [];
      const total = result[0].totalCount[0]?.count || 0;

      return {
        shippings,
        totalCount: total,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof GlobalErrorHandler) {
        throw error;
      }
      throw new GlobalErrorHandler(
        error instanceof Error ? error.message : "Something went wrong",
        "DatabaseError",
        "500",
        false
      );
    }
  }
}
