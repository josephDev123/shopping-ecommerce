import { startDb } from "@/lib/startDb";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { ProductService } from "../../service/productServices/ProductService";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandlerType } from "@/app/utils/globarErrorHandler";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || 1;
  const limit = req.nextUrl.searchParams.get("limit") || 10;
  // console.log(page, limit);
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);
    // const userId = new URL(req.url).searchParams.get("user_id");

    const formatPage = Number(page);
    const formatLimit = Number(limit);
    // console.log(formatPage, formatLimit);

    const result = await ProductServiceImpl.findByPaginateAndFilter(
      formatPage,
      formatLimit
    );

    // console.log("aggregate db", result);

    return SuccessApiResponseHelper(
      "get products successful",
      "ProductSuccess",
      true,
      "success",
      200,
      result
    );
  } catch (error) {
    console.log(error);
    const errorObj = error as GlobalErrorHandlerType;
    console.log(errorObj);
    return ApiResponseHelper(
      errorObj.msg,
      errorObj.name,
      errorObj.operational,
      "error",
      errorObj.code || 400
    );
  }
}
