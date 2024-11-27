"use  client";

import { SelectInput } from "@/app/(client)/generic/Input";

export default function FilterSection() {
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-xl font-semibold w-full">Filter</h2>
      <div className="flex items-center gap-3 w-full">
        <span className="w-fit whitespace-nowrap font-semibold">Sort By:</span>
        <SelectInput
          name="status"
          data={[]}
          labelName=""
          placeholder="Status"
          className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
        />
        <SelectInput
          name="category"
          data={[]}
          labelName=""
          placeholder="Category"
          className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
        />

        <SelectInput
          name="stock"
          data={[]}
          labelName=""
          placeholder="Stock"
          className="bg-white border rounded-md p-2 placeholder:text-black outline-none"
        />
      </div>
    </div>
  );
}
