"use client";

import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import ProductSize, { ProductColor } from "./ProductSize";
import Rating from "@/app/(client)/generic/Rating";
import Image from "next/image";
import { Images } from "@/app/Images";
import Link from "next/link";
import Button from "@/app/(client)/generic/Button";
import { ProductResponseType } from "@/app/types/productsType";

interface ShopItemPreviewProps {
  data: ProductResponseType;
}
export default function ShopItemPreview({ data }: ShopItemPreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-8 w-[80%] mx-auto my-10">
      {/* first grid */}
      <div className="flex gap-6">
        {/* FIRST */}
        <div className="flex flex-col h-full gap-6 w-[100px]">
          <Link
            href={`/shop/1?imgurl=${Images.productCat1}`}
            className="bg-green-400 w-[100px] rounded-md h-[100px] block relative"
          >
            <Image src={Images.productCat1} fill alt="" />
          </Link>
          <Link
            href={`/shop/1?imgurl=${Images.productCat1}`}
            className="bg-green-400 w-[100px] rounded-md h-[100px] block relative"
          >
            <Image src={Images.productCat2} fill alt="" />
          </Link>
          <Link
            href={`/shop/1?imgurl=${Images.productCat1}`}
            className="bg-green-400 w-[100px] rounded-md h-[100px] block relative"
          >
            <Image src={Images.productCat3} fill alt="" />
          </Link>
          <Link
            href={`/shop/1?imgurl=${Images.productCat1}`}
            className="bg-green-400 w-[100px] rounded-md h-[100px] block relative"
          >
            <Image src={Images.product4} fill alt="" />
          </Link>
        </div>
        {/* SECOND */}
        <Link
          href={`/shop/1`}
          className="w-full bg-red-400  h-[400px] block relative"
        >
          <Image src={Images.product4} fill alt="" />
        </Link>
      </div>
      {/* second grid */}
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-medium">{data.data.productName}</h2>
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

        <ProductSize className="mt-3" />
        <ProductColor className="mt-3" />
        <div className="flex items-center mt-4 gap-3">
          <div className="flex border rounded-md p-2 w-[15%] justify-between">
            <span className="cursor-pointer text-xl">-</span>
            <span className="">1</span>
            <span className="cursor-pointer text-xl">+</span>
          </div>

          <Button
            textContent="Add to Cart"
            className="border rounded-md p-2 font-medium hover:bg-gray-100"
          />

          <Button
            textContent="Compare"
            className="border rounded-md p-2 font-medium hover:bg-gray-100"
          />
        </div>

        <hr className="my-10" />
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center gap-8">
            <span className="w-20">SKU</span> <span>:SS001</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-20">Category</span> <span>:Sofas</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-20">Tags</span>{" "}
            <span>:Sofa, Chair, Home, Shop</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="w-20">Share</span>{" "}
            <span className="flex items-center gap-2">
              : <BsFacebook /> <FaLinkedin /> <AiFillTwitterCircle />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
