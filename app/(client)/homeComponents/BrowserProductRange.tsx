"use client";

import { IproductCategory } from "@/app/data/productCategory";
import Image from "next/image";

type IBrowserProductRange = {
  data: IproductCategory[];
};

export default function BrowserProductRange({ data }: IBrowserProductRange) {
  return (
    <section className="flex flex-col items-center py-6 w-[80%] mx-auto">
      <h2 className="font-bold text-xl">Browse The Range</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div className="grid sm:grid-cols-3 min-[425px]:grid-cols-2 grid-cols-1 gap-6 relative w-full mt-8">
        {data.map((productCategory) => (
          <div
            key={productCategory.id}
            className="flex flex-col justify-center items-center space-y-3"
          >
            <Image
              src={productCategory.imgurl}
              alt=""
              objectFit="contain"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
            <p className="font-bold">{productCategory.category_name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
