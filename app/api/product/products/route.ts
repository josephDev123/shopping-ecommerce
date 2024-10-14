import { startDb } from "@/lib/startDb";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { ProductService } from "../../service/productServices/ProductService";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandlerType } from "@/app/utils/globarErrorHandler";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);
    const page = new URL(req.url).searchParams.get("page") || 0;
    const limit = new URL(req.url).searchParams.get("limit");
    console.log(page, limit);
    const formatPage = Number(page);
    const formatLimit = Number(limit);
    // populate this condition
    const queryCondition = {};
    const result = await ProductServiceImpl.findByPaginateAndFilter(
      formatPage,
      formatLimit,
      queryCondition
    );
    console.log("hello", result);
    return SuccessApiResponseHelper(
      result?.msg || "",
      result?.name || "",
      result?.operational || false,
      result?.type || "",
      result?.status || 200,
      result?.data || [],
      result?.additionalData || {}
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
