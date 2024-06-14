import { AddProductRepository } from "../repository/AddProductRepository";
import { AddProductSchemaTypes } from "@/models/AddProductsModel";

export class AddProductService {
  constructor(private readonly AddProductRepository: AddProductRepository) {}
  async create(addProductInputs: AddProductSchemaTypes) {
    const result = await this.AddProductRepository.create(addProductInputs);
    return result;
  }
}
