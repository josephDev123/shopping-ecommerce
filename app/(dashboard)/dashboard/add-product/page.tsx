"use client";

import Input, {
  SelectInput,
  TextareaInput,
} from "@/app/(client)/generic/Input";
import { marketplaceCategories } from "../../types/CategoryData";
import ImageGrid from "./components/ImageGrid";
import { weightUnits } from "../../types/weigthUnit";
import Button from "@/app/(client)/generic/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormDataSchema } from "./types/addProductDataTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import axios from "axios";
import { useState } from "react";
import { axiosInstance } from "@/app/axiosInstance";
import { toast } from "react-toastify";
import { GlobalErrorHandlerType } from "@/app/utils/globarErrorHandler";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
// import { returnUploadedImagePattern } from "@/app/hooks/useUploadFileToFirebaseStorage";

export default function page() {
  const [productImg, setProductImg] = useState<FileList | null>(null);
  const { data: session } = useSession();

  type inferProductFormDataType = z.infer<typeof ProductFormDataSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<inferProductFormDataType>({
    resolver: zodResolver(ProductFormDataSchema),
  });

  const { mutate, isPending, data, isError, error } = useMutation({
    mutationFn: async (data: inferProductFormDataType) => {
      try {
        if (!productImg || productImg.length === 0) {
          toast.error("No product image was deploy. Deploy one or more");
          console.log("oops");
          return;
        }

        const formData = new FormData();
        const fileList = productImg;
        if (fileList && fileList.length) {
          Array.from(fileList).forEach((file) => {
            formData.append("productImgUrl", file);
          });
        }
        formData.append("user_id", session?.user.id || "");
        formData.append("productName", data.productName);
        formData.append("Description", data.Description);
        formData.append("productCategory", data.productCategory);
        formData.append("productTag", data.productTag);
        formData.append("productPrice", data.productPrice);
        formData.append("productDiscount", data.productDiscount);
        formData.append("productQuantity", data.productQuantity);
        formData.append("productSKU", data.productSKU);
        formData.append("productSize", data.productSize);
        formData.append("productItemWeight", data.productItemWeight);
        formData.append("productUnit", data.productUnit);
        formData.append("productBreath", data.productBreath);
        formData.append("productLength", data.productLength);
        formData.append("productWidth", data.productWidth);

        const res = await axiosInstance({
          url: "api/product/add-products",
          method: "POST",
          data: formData,
        });

        toast.success(res.data.msg);

        setProductImg(null);
        reset();
        return res.data;
      } catch (error) {}
    },
  });

  console.log(errors);
  const handleSubmitAddProduct: SubmitHandler<
    inferProductFormDataType
  > = async (data) => {
    mutate(data);
  };

  return (
    <div>
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
                  register={register}
                  name="productName"
                />

                <TextareaInput
                  labelName="Description"
                  className="border p-2 rounded-md"
                  register={register}
                  name="Description"
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
                    register={register}
                    name="productCategory"
                    errorLabel={
                      errors.productCategory &&
                      String(errors.productCategory?.message)
                    }
                  />

                  <Input
                    labelName="Product Tag"
                    className="border p-2 rounded-md"
                    register={register}
                    name="productTag"
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
                    register={register}
                    name="productPrice"
                    errorLabel={
                      errors.productPrice &&
                      String(errors.productPrice?.message)
                    }
                  />

                  <Input
                    labelName="Discount"
                    className="border p-2 rounded-md"
                    placeholder="$20.00 or 20%"
                    register={register}
                    name="productDiscount"
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
                    register={register}
                    name="productQuantity"
                    errorLabel={
                      errors.productQuantity &&
                      String(errors.productQuantity?.message)
                    }
                  />

                  <Input
                    labelName="SKU"
                    className="border p-2 rounded-md"
                    placeholder="APL-IPHONE-BLACK-80GB"
                    register={register}
                    name="productSKU"
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
                    register={register}
                    name="productSize"
                    errorLabel={
                      errors.productSize && String(errors.productSize?.message)
                    }
                  />

                  {/* <Input
                    type="color"
                    labelName="Color"
                    {...register("productColor")}
                    errorLabel={
                      errors.productColor &&
                      String(errors.productColor?.message)
                    }
                  /> */}
                </div>
              </div>
            </div>

            {/* second grid */}
            <div className="flex flex-col space-y-6">
              <ImageGrid
                setProductImg={setProductImg}
                isPending={isPending}
                isError={isError}
                error={error}
                data={data}
              />
              <div className="flex flex-col rounded-md space-y-4 p-3 border">
                <h1 className="text-xl font-bold">Shipping and Delivery</h1>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    labelName="Item Weight"
                    className="border p-2 rounded-md col-span-2"
                    placeholder="10"
                    register={register}
                    name="productItemWeight"
                    errorLabel={
                      errors.productItemWeight &&
                      String(errors.productItemWeight?.message)
                    }
                  />

                  <SelectInput
                    data={weightUnits}
                    labelName="Unit"
                    className="border p-2 rounded-md col-span-2"
                    register={register}
                    name="productUnit"
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
                    register={register}
                    name="productBreath"
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
                    register={register}
                    name="productLength"
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
                    register={register}
                    name="productWidth"
                    errorLabel={
                      errors.productWidth &&
                      String(errors.productWidth?.message)
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
                disabled={isSubmitting}
                type="submit"
                textContent="Publish"
                className="border rounded-md w-20 p-2 bg-blue-300 hover:bg-blue-400 hover:text-black/80"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
