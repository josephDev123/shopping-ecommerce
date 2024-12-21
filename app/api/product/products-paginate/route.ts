import { startDb } from "@/lib/startDb";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { ProductService } from "../../service/productServices/ProductService";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandlerType } from "@/app/utils/globarErrorHandler";
// import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);
    // const userId = new URL(req.url).searchParams.get("user_id");
    const page = new URL(req.url).searchParams.get("page") || 1;
    const limit = new URL(req.url).searchParams.get("limit") || 4;

    const formatPage = Number(page);
    const formatLimit = Number(limit);
    console.log(formatPage, formatLimit);

    const result = await ProductServiceImpl.findByPaginateAndFilter(
      formatPage,
      formatLimit
    );

    console.log(formatPage, formatLimit, result);

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
