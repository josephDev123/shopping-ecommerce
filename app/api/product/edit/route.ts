import { startDb } from "@/lib/startDb";
import { ProductRepository } from "../repository/ProductRepository";
import ProductModel, {
  ProductSchemaTypes,
} from "@/app/api/product/model/ProductsModel";
import { ProductService } from "../services/ProductService";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandlerType } from "@/app/utils/globarErrorHandler";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);
    const product_id = req.nextUrl.searchParams.get("product_id");
    const newDoc = (await req.json()) as ProductSchemaTypes;
    const result = await ProductServiceImpl.updateById(product_id!, newDoc);
    // console.log(result);
    return SuccessApiResponseHelper(
      result?.msg || "",
      result?.name || "",
      result?.operational || false,
      result?.type || "",
      result?.status || 0,
      result?.data || {}
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
      errorObj.code
    );
  }
}
