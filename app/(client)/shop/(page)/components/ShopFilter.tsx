"use client";

import AnimateInPanel from "@/app/(client)/generic/AnimateInPanel";
import { productCategory } from "@/app/data/productCategory";
import { sizes } from "@/app/data/size";
import FilterIcons from "@/app/svgComponent/FilterIcons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GoHorizontalRule } from "react-icons/go";

export default function ShopFilter() {
  const [visible, setVisible] = useState<"hidden" | "visible">("hidden");
  const searchParams = useSearchParams();

  const router = useRouter();
  const variants = {
    visible: {
      opacity: 1,
      x: 1,
      y: 1,
      transition: { duration: 0.5, staggerChildren: 0.07, delayChildren: 0.2 },
    },
    hidden: {
      opacity: 0,
      x: -10,
      y: -10,
      transition: { duration: 0.5, staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const childrenVariants = {
    visible: { opacity: 1, x: 1, y: 1 },
    hidden: { opacity: 0, x: -1, y: -1 },
  };
  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      <span
        className="flex  items-center cursor-pointer gap-1 h-fit"
        onClick={() => setVisible("visible")}
      >
        <FilterIcons />
        <span className="font-bold">Filter</span>
        {/* <PiDotsSixBold className="text-xl font-bold" /> */}
        {/* <BiviewList /> */}
        <GoHorizontalRule className="rotate-90" />
      </span>

      <AnimateInPanel
        state={visible}
        closeModal={() => setVisible("hidden")}
        parentVariants={variants}
        childVariants={childrenVariants}
      >
        <div className="flex flex-col h-full w-full text-black  p-4 bg-white">
          <div className="flex items-center justify-between border-b pb-2">
            <h1 className=" text-lg">Filter Results</h1>
            <AiOutlineClose
              onClick={() => setVisible("hidden")}
              className="cursor-pointer hover:bg-gray-200 p-1 rounded-full text-2xl"
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <p className="">Sort By</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <p className="">Category</p>
            <div className="inline-flex gap-2 items-center flex-wrap">
              {productCategory.map((category, index) => (
                <button
                  onClick={() =>
                    updateSearchParam("category", category.category_name)
                  }
                  key={index}
                  type="button"
                  className="border rounded-md p-1 hover:bg-gray-200 text-black/55"
                >
                  {category.category_name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <p className="">Size</p>
            <div className="inline-flex gap-2 items-center flex-wrap">
              {sizes.map((size, index) => (
                <button
                  onClick={() => updateSearchParam("size", size)}
                  key={index}
                  type="button"
                  className="border rounded-md p-1 hover:bg-gray-200 text-black/55"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <p className="">Price</p>
            <div className="flex w-full gap-2 items-center">
              <input
                type="range"
                onChange={(e) => updateSearchParam("price", e.target.value)}
                name=""
                id=""
                step={100}
                // min={500}
                max={1000000}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link href="shop" className="py-1 px-3 rounded-full border">
              Clear
            </Link>
            {/* <button
              type="button"
              className="py-1 px-3 rounded-full bg-[#ebd1af] hover:bg-[#f7e2c7] hover:text-black/75"
            >
              Apply Filter
            </button> */}
          </div>
        </div>
      </AnimateInPanel>
    </>
  );
}
