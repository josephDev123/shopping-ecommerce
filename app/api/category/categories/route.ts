import { NextRequest, NextResponse } from "next/server";
import { startDb } from "@/lib/startDb";
import { categoryRepository } from "../../repository/CategoryRepo";
import { categoryService } from "../../service/CategoryService";
import OrderModel from "@/models/OrderModel";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import { GlobalErrorHandler } from "@/app/utils/globarErrorHandler";
import ProductModel from "@/models/ProductsModel";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const CategoryRepoImpl = new categoryRepository(OrderModel, ProductModel);
    const CategoryServiceImpl = new categoryService(CategoryRepoImpl);
    const user_id = req.nextUrl.searchParams.get("user_id") as string;
    const page = Number(req.nextUrl.searchParams.get("page")) ?? 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) ?? 5;
    // console.log(user_id, page, limit);
    const response = await CategoryServiceImpl.getUserCategoriesByPaginate(
      page,
      limit,
      user_id
    );

    return SuccessApiResponseHelper(
      "category successful",
      "CategorySuccess",
      false,
      "success",
      200,
      response,
      []
    );
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
