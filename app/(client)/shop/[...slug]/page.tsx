import { Images } from "@/app/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbMathGreater } from "react-icons/tb";
import Rating from "../../generic/Rating";
import ProductSize from "./components/ProductSize";

export default function page() {
  return (
    <section className="flex flex-col w-full h-full">
      <div className="bg-[#F9F1E7] flex flex-col">
        <div className="flex items-center justify-start py-6 w-[80%] gap-3 mx-auto">
          <Link className="inline-flex items-center gap-1" href={"/"}>
            <span className="text-black/50">Home</span> <TbMathGreater />
          </Link>
          <Link className="inline-flex items-center gap-1" href={"/"}>
            <span className="text-black/50">Shop</span> <TbMathGreater />
          </Link>
          <div className="h-8 w-0.5 bg-black"></div>
          <span className="font-bold">Shooper</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 w-[80%] mx-auto my-10">
        {/* first grid */}
        <div className="flex gap-6">
          {/* FIRST */}
          <div className="flex flex-col h-full gap-6 w-[100px]">
            <div className="bg-green-400 w-[100px] rounded-md h-[100px] block relative">
              <Image src={Images.productCat1} fill alt="" />
            </div>
            <div className="bg-green-400 w-[100px] rounded-md h-[100px] block relative">
              <Image src={Images.productCat2} fill alt="" />
            </div>
            <div className="bg-green-400 w-[100px] rounded-md h-[100px] block relative">
              <Image src={Images.productCat3} fill alt="" />
            </div>
            <div className="bg-green-400 w-[100px] rounded-md h-[100px] block relative">
              <Image src={Images.product4} fill alt="" />
            </div>
          </div>
          {/* SECOND */}
          <div className="w-full bg-red-400  h-[400px] block relative">
            <Image src={Images.product4} fill alt="" />
          </div>
        </div>
        {/* second grid */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-medium">Shopper Helicopter</h2>
          <p>USD 250000</p>
          <div className="flex gap-3 items-center ">
            <Rating rating={3} /> <div className="h-6 w-0.5 bg-black/80"></div>{" "}
            <p className="text-black/70">5 Customer Review</p>
          </div>

          <p className="font-medium mt-3">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>

          <ProductSize className="mt-5" />
        </div>
      </div>
    </section>
  );
}
