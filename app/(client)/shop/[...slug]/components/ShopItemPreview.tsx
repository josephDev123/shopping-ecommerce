"use client";

import ProductSize, { ProductColor } from "./ProductSize";
import Rating from "@/app/(client)/generic/Rating";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/(client)/generic/Button";
import { ProductResponseType } from "@/app/types/productsType";
import { useState } from "react";
import { useAppDispatch } from "@/lib/slices/hooks";
import { useSession } from "next-auth/react";
import { setCart } from "@/lib/slices/addToCartSlice";
import { toast } from "react-toastify";
import { FullProduct } from "@/app/types/productWithRelatedItem";
import { ICountData } from "./ShopDetailSection";
import { CiStar } from "react-icons/ci";

interface ShopItemPreviewProps {
  data: FullProduct;
  ReviewCountInfo: ICountData;
}
export default function ShopItemPreview({
  data,
  ReviewCountInfo,
}: ShopItemPreviewProps) {
  const productDataArray = Array.isArray(data) ? data : [data];
  const product = productDataArray[0] as FullProduct;
  console.log(ReviewCountInfo);
  // const [cartNo, setCartNo] = useState(0);
  const [qty, setQty] = useState(1);

  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const handleDecrement = () => {
    if (qty === 1) {
      return;
    }
    setQty((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setQty((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const CartData = {
      ...product,
      qty: qty,
      buyerEmail: session?.user.email,
      buyer_name: session?.user.name,
    };
    dispatch(setCart(CartData));
    toast.success("product added to cart", { position: "top-center" });
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 w-[80%] mx-auto my-10">
      {/* first grid */}
      <div className="flex lg:flex-row flex-col justify-start gap-6">
        {/* FIRST */}
        <div className="flex lg:flex-col gap-6 lg:w-[100px] w-full">
          {product.productImgUrl.map((img, i) => (
            <Link
              key={i}
              style={{ objectPosition: "top" }}
              // href={`/shop/1?imgurl=${img.url}`}
              href={""}
              className="bg-green-400 w-[100px] rounded-md h-[100px] block relative"
            >
              <Image src={img.url} fill alt={img.url} className="rounded-md" />
            </Link>
          ))}
        </div>
        {/* SECOND */}
        <Link
          href={``}
          className="w-full h-[400px] block  relative rounded-md  overflow-hidden"
        >
          <Image
            style={{ objectPosition: "top left" }}
            src={product.productImgUrl[0].url}
            fill
            alt={product.productImgUrl[0].url}
            className="object-cover"
          />
        </Link>
      </div>
      {/* second grid */}
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-medium">{product.productName || ""}</h2>
        <p>USD {product.productPrice || 0}</p>
        <div className="flex gap-3 items-center ">
          {/* <Rating rating={3} /> <div className="h-6 w-0.5 bg-black/80"></div> */}
          {Object.entries(ReviewCountInfo?.distribution ?? {}).map(
            ([key, value]) => (
              <p key={key} className="inline-flex items-center gap-1">
                {value}
                <CiStar
                  className={
                    typeof value === "number" && value > 0
                      ? "text-yellow-300 font-bold  "
                      : ""
                  }
                />
              </p>
            )
          )}
          <p className="text-black/70">{ReviewCountInfo.totalReview} Review</p>
        </div>

        <p className="font-medium mt-3">{product.Description || ""}</p>

        <ProductSize className="mt-3" size={product.productSize || ""} />
        {/* <ProductColor className="mt-3" /> */}
        <div className="flex min-[375px]:flex-row flex-col items-center mt-4 gap-3  w-full">
          <div className="flex border rounded-md p-1.5 min-w-[25%] w-full justify-between">
            <button
              onClick={handleDecrement}
              className="cursor-pointer text-xl w-full"
            >
              -
            </button>
            <button className=" w-full">{qty}</button>
            <button
              onClick={handleIncrement}
              className="cursor-pointer text-xl w-full"
            >
              +
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            textContent="Add to Cart"
            className="border rounded-md p-2  w-full font-medium hover:bg-gray-100"
          />

          {/* <Button
            textContent="Compare"
            className="border rounded-md p-2 w-full font-medium hover:bg-gray-100"
          /> */}
        </div>

        <hr className="my-10" />
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center gap-8">
            <span className="w-20">SKU</span>{" "}
            <span>:{product.productSKU || ""}</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-20">Category</span>{" "}
            <span>:{product.productCategory || ""}</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-20">Tags</span>{" "}
            <span>:{product.productTag || ""}</span>
          </div>

          {/* <div className="flex items-center gap-8">
            <span className="w-20">Share</span>{" "}
            <span className="flex items-center gap-2">
              : <BsFacebook /> <FaLinkedin /> <AiFillTwitterCircle />
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
