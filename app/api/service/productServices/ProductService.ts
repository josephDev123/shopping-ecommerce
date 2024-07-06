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

  async findByPaginateAndFilter<T>(
    page: number,
    itemToShow: string,
    condition: T
  ) {
    try {
      const result = await this.AddProductRepository.findByPaginateAndFilter(
        page,
        itemToShow,
        condition
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(product_id: string) {
    try {
      const result = await this.AddProductRepository.findById(product_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
