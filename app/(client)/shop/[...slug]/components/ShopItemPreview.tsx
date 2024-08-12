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
  const productDataArray = Array.isArray(data.data) ? data.data : [data.data];
  const product = productDataArray[0];

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 w-[80%] mx-auto my-10">
      {/* first grid */}
      <div className="flex lg:flex-row flex-col justify-start gap-6">
        {/* FIRST */}
        <div className="flex flex-col gap-6 w-[100px]">
          {product.productImgUrl.map((img, i) => (
            <Link
              key={i}
              style={{ objectPosition: "top" }}
              href={`/shop/1?imgurl=${img.url}`}
              className="bg-green-400 w-[100px] rounded-md h-[100px] block relative"
            >
              <Image src={img.url} fill alt="" sizes="" />
            </Link>
          ))}
        </div>
        {/* SECOND */}
        <Link href={`/shop/1`} className="w-full h-[400px] block relative">
          <Image
            style={{ objectPosition: "top" }}
            src={product.productImgUrl[0].url}
            fill
            sizes=""
            alt=""
            objectFit="contain"
            className="h-"
          />
        </Link>
      </div>
      {/* second grid */}
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-medium">{product.productName}</h2>
        <p>USD {product.productPrice}</p>
        <div className="flex gap-3 items-center ">
          <Rating rating={3} /> <div className="h-6 w-0.5 bg-black/80"></div>{" "}
          <p className="text-black/70">5 Customer Review</p>
        </div>

        <p className="font-medium mt-3">{product.Description}</p>

        <ProductSize className="mt-3" size={product.productSize} />
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
            <span className="w-20">SKU</span> <span>:{product.productSKU}</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-20">Category</span>{" "}
            <span>:{product.productCategory}</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-20">Tags</span>{" "}
            <span>:{product.productTag}</span>
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
