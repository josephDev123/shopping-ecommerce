import { SuccessApiResponseHelper } from "../../utils/ApiResponseHelper";
import { ProductService } from "../../service/productServices/ProductService";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { NextResponse } from "next/server";

export async function GET(res: Request) {
  try {
    const productModelImpl = ProductModel;
    const productRepoImpl = new ProductRepository(productModelImpl);
    const ProductServiceImpl = new ProductService(productRepoImpl);
    const response = await ProductServiceImpl.categories();

    return SuccessApiResponseHelper(
      String(response?.msg),
      String(response?.name),
      Boolean(response?.operational),
      String(response?.type),
      Number(response?.status),
      response?.data
    );
  } catch (error) {
    console.log(error);
  }
}
