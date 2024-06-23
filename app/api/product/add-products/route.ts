import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "../../service/productServices/ProductService";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import { startDb } from "@/lib/startDb";
import ProductModel from "@/models/ProductsModel";
import { ProductSchemaTypes } from "@/models/ProductsModel";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import {
  GlobalErrorHandler,
  GlobalErrorHandlerType,
} from "@/app/utils/globarErrorHandler";

export async function POST(req: Request) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);

    const addProductInputs: ProductSchemaTypes = await req.json();
    const result = await ProductServiceImpl.create(addProductInputs);
    // console.log(result);
    return SuccessApiResponseHelper(
      result?.msg || "",
      result?.name || "",
      result?.operational || false,
      result?.type || "",
      result?.status || 0,
      result?.data || ""
    );
    // return Response.json(result, { status: 200 });
  } catch (error) {
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
