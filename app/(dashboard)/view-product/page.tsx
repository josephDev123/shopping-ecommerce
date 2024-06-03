import Input, { SelectInput, Textarea } from "@/app/(client)/generic/Input";
import { marketplaceCategories } from "../types/CategoryData";
import ImageGrid from "../add-product/components/ImageGrid";
import { weightUnits } from "../types/weigthUnit";
import Button from "@/app/(client)/generic/Button";

export default function page() {
  return (
    <section className="flex flex-col h-full w-full p-3">
      <h1 className="text-xl font-bold">View Product</h1>
      <div className="w-full grid grid-cols-3 gap-4 mt-4">
        {/* first grid */}
        <div className="flex flex-col col-span-2  space-y-6 ">
          <div className="flex flex-col rounded-md space-y-4 p-3 border">
            <h1 className="text-xl font-bold">General Information</h1>
            <Input
              labelName="Product Name"
              errorLabel=""
              className="border p-2 rounded-md"
            />

            <Textarea
              labelName="Description"
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col rounded-md space-y-4 p-3 border">
            <h1 className="text-xl font-bold">Category</h1>
            <div className="grid grid-cols-2 gap-4">
              <SelectInput
                data={marketplaceCategories}
                labelName="Product Name"
                errorLabel=""
                className="border p-2 rounded-md"
              />

              <Input
                labelName="Product Tag"
                className="border p-2 rounded-md"
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
              />

              <Input
                labelName="Discount"
                className="border p-2 rounded-md"
                placeholder="$20.00 or 20%"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                labelName="Quantity"
                className="border p-2 rounded-md"
                placeholder="10"
              />

              <Input
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
                labelName="size"
                className="border p-2 rounded-md"
                placeholder="00"
              />

              <Input
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
          <ImageGrid />
          <div className="flex flex-col rounded-md space-y-4 p-3 border">
            <h1 className="text-xl font-bold">Shipping and Delivery</h1>

            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                labelName="Item Weight"
                className="border p-2 rounded-md col-span-2"
                placeholder="10"
              />

              <SelectInput
                data={weightUnits}
                labelName="Unit"
                className="border p-2 rounded-md col-span-2"
              />
            </div>
            <div className="grid gap-4">
              <Input
                type="number"
                labelName="Breath"
                className="border p-2 rounded-md"
                placeholder="20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                labelName="Length"
                className="border p-2 rounded-md"
                placeholder="10"
              />

              <Input
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
            className="border rounded-md w-36 font-semibold p-2 bg-gray-100 hover:bg-gray-200 hover:text-white"
          />

          <Button
            textContent="Publish"
            className="border rounded-md w-20 p-2 bg-blue-300 hover:bg-blue-400 hover:text-black/80"
          />
        </div>

        <div></div>
      </div>
    </section>
  );
}
