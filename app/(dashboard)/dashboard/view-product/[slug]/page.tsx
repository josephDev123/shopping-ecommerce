"use client";

import Input, {
  SelectInput,
  TextareaInput,
} from "@/app/(client)/generic/Input";
import { marketplaceCategories } from "../../../types/CategoryData";
import ImageGrid from "../../add-product/components/ImageGrid";
import { weightUnits } from "../../../types/weigthUnit";
import Button from "@/app/(client)/generic/Button";
import { useFetchFilterAndPaginateApi } from "@/app/hooks/useFetchApiAxios";
import { useParams } from "next/navigation";
import { ServerReturnDataTypes } from "@/app/types/serverDataReturnType";

interface ViewPageType {
  params: { slug: string };
}

export default function page({ params }: ViewPageType) {
  // console.log(params.slug);
  const { slug } = useParams();

  const { data, status } = useFetchFilterAndPaginateApi(
    "product/get-product",
    "product_id",
    slug as string
  );

  return (
    <section className="flex flex-col h-full w-full p-3">
      <h1 className="text-xl font-bold">View Product</h1>
      {status == "loading" && (
        <div className="flex justify-center items-center">Loading ...</div>
      )}

      {status == "error" && (
        <div className="flex justify-center items-center text-red-400">
          Something went wrong
        </div>
      )}

      {status == "data" && (
        <>
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            {/* first grid */}
            <div className="flex flex-col col-span-2  space-y-6 ">
              <div className="flex flex-col rounded-md space-y-4 p-3 border">
                <h1 className="text-xl font-bold">General Information</h1>
                <Input
                  name=""
                  readOnly
                  labelName="Product Name"
                  value={data?.productName}
                  errorLabel=""
                  className="border p-2 rounded-md"
                />

                <TextareaInput
                  readOnly
                  name=""
                  labelName="Description"
                  value={data?.Description}
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col rounded-md space-y-4 p-3 border">
                <h1 className="text-xl font-bold">Category</h1>
                <div className="grid grid-cols-2 gap-4">
                  <SelectInput
                    readOnly
                    name=""
                    data={marketplaceCategories}
                    labelName=" Product Category"
                    placeholder={data.productName}
                    errorLabel=""
                    value={""}
                    className="border p-2 rounded-md"
                  />

                  <Input
                    readOnly
                    name=""
                    value={data.productTag}
                    labelName="Product Tag"
                    className="border p-2 rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col rounded-md space-y-4 p-3 border">
                <h1 className="text-xl font-bold">Pricing</h1>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    readOnly
                    name=""
                    value={data.productPrice}
                    labelName="Sale Price"
                    className="border p-2 rounded-md"
                    placeholder="$100.00"
                  />

                  <Input
                    readOnly
                    name=""
                    value={data.productDiscount}
                    labelName="Discount"
                    className="border p-2 rounded-md"
                    placeholder="$20.00 or 20%"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    readOnly
                    name=""
                    value={data.productQuantity}
                    type="number"
                    labelName="Quantity"
                    className="border p-2 rounded-md"
                    placeholder="10"
                  />

                  <Input
                    readOnly
                    name=""
                    value={data.productSKU}
                    labelName="SKU"
                    className="border p-2 rounded-md"
                    placeholder="APL-IPHONE-BLACK-80GB"
                  />
                </div>
              </div>

              <div className="flex flex-col rounded-md space-y-4 p-3 border">
                <h1 className="text-xl font-bold">Select your Size</h1>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    readOnly
                    name=""
                    value={data.productSize}
                    labelName="size"
                    className="border p-2 rounded-md"
                    placeholder="00"
                  />

                  <Input
                    readOnly
                    name=""
                    value={""}
                    type="color"
                    labelName="color"
                    // className="border p-2 rounded-md"
                    // placeholder="$20.00 or 20%"
                  />
                </div>
              </div>
            </div>

            {/* second grid */}
            <div className="flex flex-col space-y-6">
              {/* <ImageGrid setProductImg={[""]} /> */}
              <div className="flex flex-col rounded-md space-y-4 p-3 border">
                <h1 className="text-xl font-bold">Shipping and Delivery</h1>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    readOnly
                    name=""
                    value={data.productItemWeight}
                    type="number"
                    labelName="Item Weight"
                    className="border p-2 rounded-md col-span-2"
                    placeholder="10"
                  />

                  <SelectInput
                    readOnly
                    name=""
                    data={weightUnits}
                    placeholder={data.productUnit}
                    labelName="Unit"
                    className="border p-2 rounded-md col-span-2"
                  />
                </div>
                <div className="grid gap-4">
                  <Input
                    readOnly
                    name=""
                    value={data.productBreath}
                    type="number"
                    labelName="Breath"
                    className="border p-2 rounded-md"
                    placeholder="20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    readOnly
                    name=""
                    value={data.productLength}
                    type="number"
                    labelName="Length"
                    className="border p-2 rounded-md"
                    placeholder="10"
                  />

                  <Input
                    readOnly
                    name=""
                    value={data.productWidth}
                    type="number"
                    labelName="Width"
                    className="border p-2 rounded-md"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-10 mb-4">
            <Button
              textContent="Cancel"
              className="border rounded-md w-20 p-2 hover:bg-gray-100 hover:text-black/80"
            />

            <div className="flex items-center gap-3">
              <Button
                textContent="Save as Default"
                className="border rounded-md w-36 font-semibold p-2 bg-gray-100 hover:bg-black hover:text-white"
              />

              <Button
                textContent="Publish"
                className="border rounded-md w-20 p-2 bg-blue-300 hover:bg-blue-400 hover:text-black/80"
              />
            </div>

            <div></div>
          </div>
        </>
      )}
    </section>
  );
}
