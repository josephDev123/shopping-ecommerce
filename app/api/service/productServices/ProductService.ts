import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import { ProductSchemaTypes } from "@/models/ProductsModel";

export class ProductService {
  constructor(private readonly AddProductRepository: ProductRepository) {}
  async create(addProductInputs: ProductSchemaTypes) {
    try {
      const result = await this.AddProductRepository.create(addProductInputs);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async find(page: number) {
    try {
      const result = await this.AddProductRepository.findByPaginate(page);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
