import { Model } from "mongoose";
import { AddProductSchemaTypes } from "@/models/AddProductsModel";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ApiResponseHelper } from "../utils/ApiResponseHelper";

export class AddProductRepository {
  constructor(private readonly dbContext: Model<AddProductSchemaTypes>) {}
  async create(addProductInputs: AddProductSchemaTypes) {
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
