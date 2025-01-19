import { NextRequest, NextResponse } from "next/server";
import { startDb } from "@/lib/startDb";
import { categoryRepository } from "../repository/CategoryRepo";
import { categoryService } from "../service/CategoryService";
import OrderModel from "@/models/OrderModel";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import ProductModel from "@/models/ProductsModel";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const CategoryRepoImpl = new categoryRepository(OrderModel, ProductModel);
    const CategoryServiceImpl = new categoryService(CategoryRepoImpl);
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 4;
    console.log(page, limit);
    const response = await CategoryServiceImpl.getCategories(page, limit);

    return NextResponse.json(
      { msg: "category successful", data: response },
      { status: 200 }
    );

    // return SuccessApiResponseHelper(
    //   String(response?.msg),
    //   String(response?.name),
    //   Boolean(response?.operational),
    //   String(response?.type),
    //   Number(response?.status) ?? 200,
    //   response?.data
    // );
  } catch (error) {
    const errorObj = error as GlobalErrorHandler;
    return ApiResponseHelper(
      errorObj.message,
      "CategoryError",
      true,
      "error",
      500
    );
  }
}
