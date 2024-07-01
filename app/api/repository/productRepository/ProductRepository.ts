import { Model } from "mongoose";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ApiResponseHelper } from "../../utils/ApiResponseHelper";

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

  async findByPaginateAndFilter<T>(page: number, condition: T) {
    try {
      const limit = 3;
      const queryCondition = condition;
      const skip = page * limit;
      const result = await this.dbContext.find().skip(skip).limit(limit);
      return {
        msg: "get products successful",
        name: "MongodbSuccess",
        operational: true,
        type: "success",
        status: 200,
        data: result,
      };
    } catch (error) {
      new GlobalErrorHandler("get product fails", "UnknownError", "500", true);
    }
  }
}
