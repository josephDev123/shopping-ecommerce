import mongoose, { Model, PipelineStage } from "mongoose";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";
import { ProductDataType } from "@/app/types/productsType";

export type IRelatedOpts = { page?: number; limit?: number };

export class ProductRepository {
  constructor(private readonly dbContext: Model<ProductSchemaTypes>) {}
  async create(addProductInputs: ProductSchemaTypes) {
    try {
      const newDocument = new this.dbContext(addProductInputs);
      await newDocument.save();
      return {
        msg: "Create product successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: "",
      };
    } catch (error) {
      new GlobalErrorHandler("Add product fails", "UnknownError", "500", true);
    }
  }

  async find() {
    try {
      const result = await this.dbContext.find();
      return {
        msg: "get products successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findByPaginateAndFilter<T>(
    page: number,
    itemToShow: number
    // condition: T
  ) {
    try {
      const limit = Number(itemToShow);
      // const queryCondition = condition;
      const skip = (page - 1) * limit;

      const productsQueryAggregate = [
        {
          $facet: {
            productDocs: [{ $skip: skip }, { $limit: limit }],
            totalDoc: [{ $count: "total" }],
          },
        },
      ];

      const response = await this.dbContext.aggregate(productsQueryAggregate);
      // console.log(response);
      const result = response[0]?.productDocs || [];
      const totalProduct: number = response[0]?.totalDoc[0]?.total || 0;

      return {
        products: result,
        totalDoc: totalProduct,
      };
    } catch (error) {
      const customError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        customError.msg,
        customError.name,
        "500",
        false
      );
    }
  }

  // async findById(id: string) {
  //   try {
  //     const doc = await this.dbContext.findById(
  //       new mongoose.Types.ObjectId(id)
  //     );

  //     if (!doc) {
  //       throw new GlobalErrorHandler("No item found", "NotFound", "404", true);
  //     }

  //     // related item by category

  //     const relatedItemAgg = await this.dbContext.aggregate([
  //       {
  //         $facet: {
  //           relatedItem: [
  //             {
  //               $match: {
  //                 productCategory: doc.productCategory,
  //               },
  //             },
  //           ],
  //           total:[
  //             {
  //               $count:
  //             }
  //           ]
  //         },
  //       },
  //     ]);
  //     return {
  //       msg: "get product successful",
  //       name: "MongodbSuccess",
  //       operational: true,
  //       type: "success",
  //       status: 200,
  //       data: doc,
  //     };
  //   } catch (error) {
  //     new GlobalErrorHandler("get product fails", "UnknownError", "500", true);
  //   }
  // }

  async findByIdWithRelated(id: string, opts: IRelatedOpts = {}) {
    const page = Math.max(1, opts.page ?? 1);
    const limit = Math.min(50, Math.max(1, opts.limit ?? 8));
    const skip = (page - 1) * limit;

    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new GlobalErrorHandler(
          "Invalid product id",
          "BadRequest",
          "400",
          true
        );
      }

      // 1) Fetch the product
      const product = await this.dbContext.findById(id).lean();
      if (!product) {
        throw new GlobalErrorHandler("No item found", "NotFound", "404", true);
      }

      // Guard: if there’s no category, just return the product (no related)
      if (!product.productCategory) {
        return success({
          product,
          related: { items: [], total: 0, page, pageCount: 0 },
        });
      }

      // 2) Related by same category (exclude self). Add extra $match as needed.
      const pipeline: PipelineStage[] = [
        {
          $match: {
            productCategory: product.productCategory,
            // _id: { $ne: new mongoose.Types.ObjectId(product._id) },
            // e.g. only published items:
            // isPublished: true,
          },
        },
        { $sort: { createdAt: -1 } }, // or by popularity, rating, etc.
        {
          $facet: {
            items: [
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  _id: 1,
                  productName: 1,
                  Description: 1,
                  productCategory: 1,
                  productTag: 1,
                  productPrice: 1,
                  productDiscount: 1,
                  // "productQuantity": 755,
                  // "productSKU": "Min_se",
                  // "productSize": "100",
                  // "productItemWeight": 66,
                  // "productUnit": "Hectogram (hg)",
                  // "productBreath": 56,
                  // "productLength": 100,
                  // "productWidth": 34,
                  productImgUrl: 1,
                },
              },
            ],
            total: [{ $count: "count" }],
          },
        },
      ];

      const [agg] = await this.dbContext.aggregate(pipeline);
      const items = agg?.items ?? [];
      const total = agg?.total?.[0]?.count ?? 0;
      const pageCount = total === 0 ? 0 : Math.ceil(total / limit);

      return success({
        product,
        related: { items, total, page, pageCount },
      });
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "get product fails",
        "UnknownError",
        "500",
        true
      );
    }
  }

  async updateById(id: string, doc: ProductSchemaTypes) {
    try {
      const update = await this.dbContext.findByIdAndUpdate(id, doc, {
        new: true,
      });
      return {
        msg: " product update successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: doc,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async categories() {
    try {
      // Aggregation pipeline to group products by category
      const groupedProducts = await this.dbContext.aggregate([
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
      ]);

      return {
        msg: " product category successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: groupedProducts,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async category(query: string) {
    try {
      // Aggregation pipeline to group products by category
      const groupedProduct = await this.dbContext.aggregate([
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
        {
          $match: {
            _id: query,
          },
        },
      ]);

      return {
        msg: " product category successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: groupedProduct,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

// small helper for consistent response shape
function success(data: unknown) {
  return {
    msg: "get product successful",
    name: "MongodbSuccess",
    operational: true,
    type: "success",
    status: 200,
    data,
  };
}
