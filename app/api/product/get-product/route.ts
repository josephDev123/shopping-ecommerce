import { startDb } from "@/lib/startDb";
import { ProductRepository } from "../../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { ProductService } from "../../service/productServices/ProductService";
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

// export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await startDb();
    const ProductRepositoryImp = new ProductRepository(ProductModel);
    const ProductServiceImpl = new ProductService(ProductRepositoryImp);
    const product_id = req.nextUrl.searchParams.get("product_id");
    console.log("from product", product_id);
    // const result = await ProductServiceImpl.findById(product_id || "");
    // console.log(product_id);
    // return SuccessApiResponseHelper(
    //   result?.msg || "",
    //   result?.name || "",
    //   result?.operational || false,
    //   result?.type || "",
    //   result?.status || 200,
    //   result?.data || {}
    // );

    return NextResponse.json({ msg: product_id }, { status: 200 });
  } catch (error) {
    // console.log(error);

    if (error instanceof GlobalErrorHandler) {
      return ApiResponseHelper(
        error.msg,
        error.name,
        error.operational,
        "error",
        error.code as unknown as number
      );
    }
  }
}
