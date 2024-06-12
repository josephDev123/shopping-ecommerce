import { z } from "zod";

export const ProductFormDataSchema = z.object({
  productName: z.string(),
  Description: z.string(),
  productCategory: z.string(),
  productTag: z.string(),
  productPrice: z.string(),
  productDiscount: z.string(),
  productQuantity: z.number(),
  productSKU: z.string(),
  productSize: z.string(),
  productColor: z.string(),
  productItemWeight: z.number(),
  productUnit: z.string(),
  productBreath: z.number(),
  productLength: z.number(),
  productWidth: z.number(),
  //   productImage: z.instanceof(FileList).optional(), // This is the file input type
});
