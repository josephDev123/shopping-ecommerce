import { NextRequest, NextResponse } from "next/server";
import { AddProductService } from "../service/addProductService";
import { AddProductRepository } from "../repository/AddProductRepository";
import { startDb } from "@/lib/startDb";
import { AddProductModel } from "@/models/AddProductsModel";
import { AddProductSchemaTypes } from "@/models/AddProductsModel";

async function addProduct(req: Request) {
  await startDb();

  const AddProductRepositoryImp = new AddProductRepository(AddProductModel);
  const AddProductServiceImpl = new AddProductService(AddProductRepositoryImp);

  const addProductInputs: AddProductSchemaTypes = await req.json();
  const result = await AddProductServiceImpl.create(addProductInputs);
  return Response.json(result);
}
