"use client";

import Input, { SelectInput, Textarea } from "@/app/(client)/generic/Input";
import { marketplaceCategories } from "../types/CategoryData";
import ImageGrid from "./components/ImageGrid";
import { weightUnits } from "../types/weigthUnit";
import Button from "@/app/(client)/generic/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormDataSchema } from "./types/addProductDataTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { axiosInstance } from "@/app/axiosInstance";

export default function page() {
  const [productImg, setProductImg] = useState<string[]>([]);
  type inferProductFormDataType = z.infer<typeof ProductFormDataSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<inferProductFormDataType>({
    resolver: zodResolver(ProductFormDataSchema),
  });

  const handleSubmitAddProduct: SubmitHandler<
    inferProductFormDataType
  > = async (data) => {
    const payload = {
      ...data,
      productImgUrl: productImg,
    };
    const res = await axiosInstance({
      url: "add-products",
      method: "POST",
      data: payload,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSubmitAddProduct)}
        className="flex flex-col h-full w-full p-3"
      >
        <h1 className="text-xl font-bold">Create a New Product</h1>
        <div className="w-full grid grid-cols-3 gap-4 mt-4">
          {/* first grid */}
          <div className="flex flex-col col-span-2  space-y-6 ">
            <div className="flex flex-col rounded-md space-y-4 p-3 border">
              <h1 className="text-xl font-bold">General Information</h1>
              <Input
                labelName="Product Name"
                errorLabel={
                  errors.productName && String(errors.productName?.message)
                }
                className="border p-2 rounded-md"
                {...register("productName")}
              />

              <Textarea
                labelName="Description"
                className="border p-2 rounded-md"
                {...register("Description")}
                errorLabel={
                  errors.Description && String(errors.Description?.message)
                }
              />
            </div>

            <div className="flex flex-col rounded-md space-y-4 p-3 border">
              <h1 className="text-xl font-bold">Category</h1>
              <div className="grid grid-cols-2 gap-4">
                <SelectInput
                  data={marketplaceCategories}
                  labelName="Product Category"
                  className="border p-2 rounded-md"
                  {...register("productCategory")}
                  errorLabel={
                    errors.productCategory &&
                    String(errors.productCategory?.message)
                  }
                />

                <Input
                  labelName="Product Tag"
                  className="border p-2 rounded-md"
                  {...register("productTag")}
                  errorLabel={
                    errors.productTag && String(errors.productTag?.message)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col rounded-md space-y-4 p-3 border">
              <h1 className="text-xl font-bold">Pricing</h1>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  labelName="Sale Price"
                  className="border p-2 rounded-md"
                  placeholder="$100.00"
                  {...register("productPrice")}
                  errorLabel={
                    errors.productPrice && String(errors.productPrice?.message)
                  }
                />

                <Input
                  labelName="Discount"
                  className="border p-2 rounded-md"
                  placeholder="$20.00 or 20%"
                  {...register("productDiscount")}
                  errorLabel={
                    errors.productDiscount &&
                    String(errors.productDiscount?.message)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  labelName="Quantity"
                  className="border p-2 rounded-md"
                  placeholder="10"
                  {...register("productQuantity")}
                  errorLabel={
                    errors.productQuantity &&
                    String(errors.productQuantity?.message)
                  }
                />

                <Input
                  labelName="SKU"
                  className="border p-2 rounded-md"
                  placeholder="APL-IPHONE-BLACK-80GB"
                  {...register("productSKU")}
                  errorLabel={
                    errors.productSKU && String(errors.productSKU?.message)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col rounded-md space-y-4 p-3 border">
              <h1 className="text-xl font-bold">Select your Size</h1>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  labelName="size"
                  className="border p-2 rounded-md"
                  placeholder="00"
                  {...register("productSize")}
                  errorLabel={
                    errors.productSize && String(errors.productSize?.message)
                  }
                />

                <Input
                  type="color"
                  labelName="color"
                  {...register("productColor")}
                  errorLabel={
                    errors.productColor && String(errors.productColor?.message)
                  }
                  // className="border p-2 rounded-md"
                  // placeholder="$20.00 or 20%"
                />
              </div>
            </div>
          </div>

          {/* second grid */}
          <div className="flex flex-col space-y-6">
            <ImageGrid
              register={register}
              error={errors.productImage}
              setProductImg={(values: string[]) => setProductImg(values)}
            />
            <div className="flex flex-col rounded-md space-y-4 p-3 border">
              <h1 className="text-xl font-bold">Shipping and Delivery</h1>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  labelName="Item Weight"
                  className="border p-2 rounded-md col-span-2"
                  placeholder="10"
                  {...register("productItemWeight")}
                  errorLabel={
                    errors.productItemWeight &&
                    String(errors.productItemWeight?.message)
                  }
                />

                <SelectInput
                  data={weightUnits}
                  labelName="Unit"
                  className="border p-2 rounded-md col-span-2"
                  {...register("productUnit")}
                  errorLabel={
                    errors.productUnit && String(errors.productUnit?.message)
                  }
                />
              </div>
              <div className="grid gap-4">
                <Input
                  type="number"
                  labelName="Breath"
                  className="border p-2 rounded-md"
                  placeholder="20"
                  {...register("productBreath")}
                  errorLabel={
                    errors.productBreath &&
                    String(errors.productBreath?.message)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  labelName="Length"
                  className="border p-2 rounded-md"
                  placeholder="10"
                  {...register("productLength")}
                  errorLabel={
                    errors.productLength &&
                    String(errors.productLength?.message)
                  }
                />

                <Input
                  type="number"
                  labelName="Width"
                  className="border p-2 rounded-md"
                  placeholder="10"
                  {...register("productWidth")}
                  errorLabel={
                    errors.productWidth && String(errors.productWidth?.message)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-10 mb-4">
          <Button
            type="button"
            textContent="Cancel"
            className="border rounded-md w-20 p-2 hover:bg-gray-100 hover:text-black/80"
          />

          <div className="flex items-center gap-3">
            {/* <Button
              type="submit"
              textContent="Save as Default"
              className="border rounded-md w-36 font-semibold p-2 bg-gray-100 hover:bg-gray-200 hover:text-black"
            /> */}

            <Button
              type="submit"
              textContent="Publish"
              className="border rounded-md w-20 p-2 bg-blue-300 hover:bg-blue-400 hover:text-black/80"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
