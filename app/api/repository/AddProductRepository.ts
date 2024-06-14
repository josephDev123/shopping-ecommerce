import { Model } from "mongoose";
import { AddProductSchemaTypes } from "@/models/AddProductsModel";

export class AddProductRepository {
  constructor(private readonly dbContext: Model<AddProductSchemaTypes>) {}
  async create(addProductInputs: AddProductSchemaTypes) {
    const newDocument = new this.dbContext(addProductInputs);
    await newDocument.save();
    return { msg: "Create product successful", status: "success" };
  }
}
