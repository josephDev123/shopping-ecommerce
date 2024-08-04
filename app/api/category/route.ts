import { SuccessApiResponseHelper } from "../utils/ApiResponseHelper";
import { ProductService } from "../service/productServices/ProductService";
import { ProductRepository } from "../repository/productRepository/ProductRepository";
import ProductModel from "@/models/ProductsModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { startDb } from "@/lib/startDb";

export async function GET(req: NextRequest) {
  try {
    await startDb();
    const productModelImpl = ProductModel;
    const productRepoImpl = new ProductRepository(productModelImpl);
    const ProductServiceImpl = new ProductService(productRepoImpl);
    // const query = req.nextUrl.searchParams.get("query");
    // console.log(query);
    // const response = await ProductServiceImpl.category(query!);

    // return SuccessApiResponseHelper(
    //   String(response?.msg),
    //   String(response?.name),
    //   Boolean(response?.operational),
    //   String(response?.type),
    //   Number(response?.status),
    //   response?.data
    // );

    return NextResponse.json({ category: "category" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
