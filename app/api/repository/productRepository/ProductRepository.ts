import { Model } from "mongoose";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";
import { match } from "assert";
import { ProductDataType } from "@/app/types/productsType";

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

      // console.log("from", skip, limit);
      // const result = await this.dbContext.find().skip(skip).limit(limit);
      // const totalDoc = await this.dbContext.countDocuments({});

      const productsQueryAggregate = [
        {
          $facet: {
            products: [{ $skip: skip }, { $limit: limit }],
            totalDoc: [{ $count: "count" }],
          },
        },
      ];

      const response = await this.dbContext.aggregate(productsQueryAggregate);
      console.log(response);
      const result: ProductDataType = response[0]?.products || [];
      const totalProduct: number = response[0]?.totalDoc[0]?.count || 0;

      return {
        products: result,
        totalDoc: totalProduct,
      };
      // return {
      //   msg: "get paginated products successful",
      //   name: "MongodbSuccess",
      //   operational: true,
      //   type: "success",
      //   status: 200,
      //   data: result,
      //   additionalData: {
      //     totalDoc,
      //   },
      // };
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

  async findById(id: string) {
    try {
      const doc = await this.dbContext.findById(id);
      return {
        msg: "get product successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: doc,
      };
      console.log(doc);
    } catch (error) {
      new GlobalErrorHandler("get product fails", "UnknownError", "500", true);
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
