import Button from "@/app/(client)/generic/Button";
import { LuUpload } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { SelectInput } from "@/app/(client)/generic/Input";
import ProductsListTable from "./components/ProductsListTable";
import FooterPagination from "../commons/FooterPagination";

export default function page() {
  return (
    <section className="flex flex-col w-full h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">product List</h2>
          <p className="text-sm">
            Manage your store's progress to increase your sales.
          </p>
        </div>

        <div className="flex gap-3">
          <Button className="border-2 rounded-md border-gray-200 hover:bg-gray-200 px-2 py-1">
            <span className="flex items-center gap-2 font-bold">
              <LuUpload />
              Export
            </span>
          </Button>
          <Button className="rounded-md  px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white">
            <span className="flex items-center gap-2">
              <GoPlus className="text-xl" />
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <hr className="border  border-gray-300 my-4" />
      <div className="flex w-full justify-between">
        <h2 className="text-xl font-semibold w-full">Filter</h2>
        <div className="flex items-center gap-3 w-full">
          <span className="w-fit whitespace-nowrap font-semibold">
            Sort By:
          </span>
          <SelectInput
            data={[]}
            labelName=""
            placeholder="Status"
            className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
          />
          <SelectInput
            data={[]}
            labelName=""
            placeholder="Category"
            className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
          />

          <SelectInput
            data={[]}
            labelName=""
            placeholder="Stock"
            className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
          />
        </div>
      </div>
      <div className="my-5 h-full">
        <ProductsListTable />
      </div>

      <FooterPagination />
    </section>
  );
}
