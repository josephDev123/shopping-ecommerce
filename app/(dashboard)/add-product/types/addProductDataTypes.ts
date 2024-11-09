import { z } from "zod";

export const ProductFormDataSchema = z.object({
  // id: z.string().optional(),
  user_id: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  Description: z.string().min(1, "Description is required"),
  productCategory: z.string().min(1, "Product category is required"),
  productTag: z.string().min(1, "Product tag is required"),
  productPrice: z.string().min(1, "Product price is required"),
  productDiscount: z.string().min(1, "Product discount is required"),
  productQuantity: z.string().min(1, "Product quantity is required"),
  productSKU: z.string().min(1, "Product SKU is required"),
  productSize: z.string().min(1, "Product size is required"),
  productItemWeight: z.string().min(1, "Product item weight is required"),
  productUnit: z.string().min(1, "Product unit is required"),
  productBreath: z.string().min(1, "Product breath is required"),
  productLength: z.string().min(1, "Product length is required"),
  productWidth: z.string().min(1, "Product width is required"),
  // productImage: z.instanceof(File).array().optional(),
  // productImgUrl: z.array(z.string()).optional(),
  productImgUrl: z
    .array(
      z.object({
        url: z.string().url().optional(), // Validates that the url, if present, is a string and a valid URL
        path: z.string().optional(), // Validates that the path, if present, is a string
      })
    )
    .optional(),
});

export type AddProductSchemaTypes = z.infer<typeof ProductFormDataSchema>;
