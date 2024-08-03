import { SuccessApiResponseHelper } from "../utils/ApiResponseHelper";
import { ProductService } from "../service/productServices/ProductService";
import { ProductRepository } from "../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextRequest) {
  try {
    const productModelImpl = ProductModel;
    const productRepoImpl = new ProductRepository(productModelImpl);
    const ProductServiceImpl = new ProductService(productRepoImpl);
    const query = req.nextUrl.searchParams.get("query");
    console.log(query);
    const response = await ProductServiceImpl.category(query!);

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
