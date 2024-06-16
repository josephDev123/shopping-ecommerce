import { z } from "zod";

export const ProductFormDataSchema = z.object({
  id: z.string().optional(),
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
  productImage: z.array(z.instanceof(File)),
  productImgUrl: z.array(z.string()),
});

export type AddProductSchemaTypes = z.infer<typeof ProductFormDataSchema>;
