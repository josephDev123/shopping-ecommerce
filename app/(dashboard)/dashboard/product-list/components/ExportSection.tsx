"use client";

import Button from "@/app/(client)/generic/Button";
import { handleDownloadAsImage } from "@/app/utils/exportFile";
import { GoPlus } from "react-icons/go";
import { LuUpload } from "react-icons/lu";

export default function ExportSection({ pageId }: { pageId: string }) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => handleDownloadAsImage(pageId, "product list")}
        className="border-2 rounded-md border-gray-200 hover:bg-gray-200 px-2 py-1"
      >
        <span className="flex items-center gap-2 font-bold">
          <LuUpload />
          Export
        </span>
      </Button>
      {/* <Button className="rounded-md  px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white">
        <span className="flex items-center gap-2">
          <GoPlus className="text-xl" />
          Add Product
        </span>
      </Button> */}
    </div>
  );
}
