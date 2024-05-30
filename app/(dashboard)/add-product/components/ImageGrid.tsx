"use client";

import { Images } from "@/app/Images";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function ImageGrid() {
  return (
    <section className="flex flex-col space-y-3  rounded-md p-3 border">
      <h1 className="font-medium">Product Image</h1>
      <div className="grid grid-cols-2 gap-2 relative h-full object-contain">
        <Image
          src={Images.productCat1}
          alt=""
          width={200}
          height={400}
          className="w-[200px]"
        />
        <Image
          src={Images.productCat2}
          alt=""
          width={200}
          height={400}
          className="w-[200px]"
        />
      </div>

      <input type="file" className="hidden" />
      <div className="flex flex-col justify-center items-center cursor-pointer border-2 border-dashed h-28">
        <IoCloudUploadOutline className="text-xl" />
        <p>Drag or upload your files</p>
      </div>
    </section>
  );
}
