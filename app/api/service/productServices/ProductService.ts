import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import {
  IRelatedOpts,
  ProductRepository,
} from "../../repository/productRepository/ProductRepository";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import mongoose from "mongoose";

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

  async findByPaginateAndFilter(
    page: number,
    itemToShow: number
    // condition: T
  ) {
    try {
      const result = await this.ProductRepository.findByPaginateAndFilter(
        page,
        itemToShow
        // condition
      );
      return result;
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

  async findByIdWithRelated(product_id: string, RelatedOpts: IRelatedOpts) {
    try {
      const result = await this.ProductRepository.findByIdWithRelated(
        product_id,
        RelatedOpts
      );
      // console.log("product service", result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
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
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async category(query: string) {
    try {
      const response = await this.ProductRepository.category(query);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
