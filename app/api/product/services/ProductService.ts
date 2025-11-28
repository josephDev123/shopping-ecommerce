import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import {
  IRelatedOpts,
  ProductRepository,
} from "../repository/ProductRepository";
import { ProductSchemaTypes } from "@/models/ProductsModel";

export class ProductService {
  constructor(private readonly ProductRepository: ProductRepository) {}
  async create(
    addProductInputs: ProductSchemaTypes,
    files: FormDataEntryValue[]
  ) {
    try {
      // console.log("file", files);
      // console.log("form data received", addProductInputs);
      const arrayBuffers = await Promise.all(
        files.map((file) =>
          file instanceof File
            ? file.arrayBuffer()
            : Promise.reject(
                new GlobalErrorHandler(
                  "Invalid file type",
                  "FileError",
                  "400",
                  true
                )
              )
        )
      );
      const buffer = arrayBuffers.map((b) => (b ? Buffer.from(b) : null));

      const result = await this.ProductRepository.create(
        addProductInputs,
        buffer
      );

      return result;
    } catch (error) {
      console.log(error);

      if (error instanceof GlobalErrorHandler) {
        throw new GlobalErrorHandler(
          error.message,
          error.name,
          error.code,
          error.operational
        );
      }

      if (error instanceof Error) {
        throw new GlobalErrorHandler(error.message, error.name, "500", false);
      }

      throw new GlobalErrorHandler(
        "Something went wrong",
        "UnknownError",
        "500",
        false
      );
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
        customError.message,
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
