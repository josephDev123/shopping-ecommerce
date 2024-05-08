"use client";

import { Images } from "@/app/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbMathGreater } from "react-icons/tb";
import Rating from "../../generic/Rating";
import ProductSize, { ProductColor } from "./components/ProductSize";
import Button from "../../generic/Button";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import ProductDescription from "./components/ProductDescription";
import AdditionalInformation from "./components/AdditionalInformation";
import Reviews from "./components/Reviews";
import { productCardData } from "@/app/data/productCardData";
import ProductCard from "../../generic/ProductCard";

export default function page() {
  const [expand, setExpand] = useState("");

  // function handleClickImg(){

  // }
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

      <hr />

      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center items-center gap-8 py-10">
          <h3
            className={`text-lg cursor-pointer ${
              expand === "description" && "font-bold"
            }`}
            onClick={() => setExpand("description")}
          >
            Description
          </h3>
          <h3
            className={`text-lg cursor-pointer ${
              expand === "additional_Information" && "font-bold"
            }`}
            onClick={() => setExpand("additional_Information")}
          >
            Additional Information
          </h3>
          <h3
            className={`text-lg cursor-pointer ${
              expand === "reviews" && "font-bold"
            }`}
            onClick={() => setExpand("reviews")}
          >
            Reviews(5)
          </h3>
        </div>
        <div className="flex justify-center w-[70%] mx-auto mb-4">
          {expand === "description" && <ProductDescription />}
          {expand === "additional_Information" && <AdditionalInformation />}
          {expand === "reviews" && <Reviews />}
        </div>
      </div>

      <hr className="py-6" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl mb-10">Related Products</h2>
        <div className="grid grid-cols-4 gap-4 w-[80%] mx-auto ">
          {productCardData.map((product, i) => (
            <ProductCard key={i} credential={product} />
          ))}
        </div>
        <Button
          textContent="Show More"
          className="my-5 border border-[#B88E2F] text-[#B88E2F] font-medium w-[245px] h-12"
        />
      </div>
    </section>
  );
}
