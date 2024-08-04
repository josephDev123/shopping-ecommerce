import { SuccessApiResponseHelper } from "../../utils/ApiResponseHelper";
import { ProductService } from "../../service/productServices/ProductService";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { NextResponse } from "next/server";
import { startDb } from "@/lib/startDb";

export async function GET(res: Request) {
  try {
    await startDb();
    const productRepoImpl = new ProductRepository(ProductModel);
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
