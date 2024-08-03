import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import { ProductSchemaTypes } from "@/models/ProductsModel";

export class ProductService {
  constructor(private readonly ProductRepository: ProductRepository) {}
  async create(addProductInputs: ProductSchemaTypes) {
    try {
      const result = await this.ProductRepository.create(addProductInputs);
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
      const result = await this.ProductRepository.findByPaginateAndFilter(
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
      const result = await this.ProductRepository.findById(product_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(product_id: string, newdoc: ProductSchemaTypes) {
    try {
      const result = await this.ProductRepository.updateById(
        product_id,
        newdoc
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async categories() {
    try {
      const response = await this.ProductRepository.categories();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async category(query: string) {
    try {
      const response = await this.ProductRepository.category(query);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
