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
}
