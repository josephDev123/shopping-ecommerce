import Button from "@/app/(client)/generic/Button";
import { SelectInput } from "@/app/(client)/generic/Input";
import React from "react";
import { MdOutlineExpandLess } from "react-icons/md";

export default function FooterPagination() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center w-full ">
        Showing
        <div>
          <SelectInput
            placeholder="10"
            data={[]}
            labelName=""
            className="border rounded-md w-12"
          />
        </div>
        <span className="inline-flex items-center justify-center">of 50</span>
      </div>

      <div className="flex gap-1">
        <Button
          textContent=""
          className="flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6"
        >
          <MdOutlineExpandLess className="-rotate-90" />
        </Button>
        <Button
          textContent=""
          className="flex justify-center items-center p-1 rounded-md bg-blue-800 text-white w-8 h-6"
        >
          1
        </Button>
        <Button
          textContent=""
          className="flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6"
        >
          2
        </Button>
        <Button
          textContent=""
          className="flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6"
        >
          3
        </Button>
        <Button
          textContent=""
          className="flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6"
        >
          4
        </Button>
        <Button
          textContent=""
          className="flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6"
        >
          <MdOutlineExpandLess className="rotate-90" />
        </Button>
      </div>
    </div>
  );
}
