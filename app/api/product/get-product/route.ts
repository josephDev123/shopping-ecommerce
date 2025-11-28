import { startDb } from "@/lib/startDb";
import {
  IRelatedOpts,
  ProductRepository,
} from "../repository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { ProductService } from "../services/ProductService";
import {
  ApiResponseHelper,
  SuccessApiResponseHelper,
} from "../../utils/ApiResponseHelper";
import {
  GlobalErrorHandler,
  GlobalErrorHandlerType,
} from "@/app/utils/globarErrorHandler";
import { NextRequest, NextResponse } from "next/server";
import GlobalError from "@/app/global-error";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);
    const product_id = req.nextUrl.searchParams.get("product_id");
    const page = Number(req.nextUrl.searchParams.get("page")) || undefined;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || undefined;
    const RelatedOpts: IRelatedOpts = {
      page,
      limit,
    };

    const result = await ProductServiceImpl.findByIdWithRelated(
      product_id || "",
      RelatedOpts
    );

    return SuccessApiResponseHelper(
      result?.msg || "",
      result?.name || "",
      result?.operational || false,
      result?.type || "",
      result?.status || 200,
      result?.data || {}
    );

    // return NextResponse.json({ msg: product_id }, { status: 200 });
  } catch (error) {
    // console.log(error);

    if (error instanceof GlobalErrorHandler) {
      return ApiResponseHelper(
        error.message,
        error.name,
        error.operational,
        "error",
        error.code as unknown as number
      );
    }
  }
}
