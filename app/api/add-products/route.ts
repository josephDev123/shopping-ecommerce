import { NextRequest, NextResponse } from "next/server";
import { AddProductService } from "../service/addProductService";
import { AddProductRepository } from "../repository/AddProductRepository";
import { startDb } from "@/lib/startDb";
import AddProductModel from "@/models/AddProductsModel";
import { AddProductSchemaTypes } from "@/models/AddProductsModel";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import {
  GlobalErrorHandler,
  GlobalErrorHandlerType,
} from "@/app/utils/globarErrorHandler";

export async function POST(req: Request) {
  try {
    await startDb();
    const AddProductRepositoryImp = new AddProductRepository(AddProductModel);
    const AddProductServiceImpl = new AddProductService(
      AddProductRepositoryImp
    );

    const addProductInputs: AddProductSchemaTypes = await req.json();
    const result = await AddProductServiceImpl.create(addProductInputs);
    console.log(result);
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
    // console.log(errorObj);
    return ApiResponseHelper(
      errorObj.msg,
      errorObj.name,
      errorObj.operational,
      "error",
      errorObj.code
    );
  }
}
