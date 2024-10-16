"use client";

import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { ProductDataType } from "@/app/types/productsType";
import { useAppDispatch } from "@/lib/slices/hooks";
import { setCart } from "@/lib/slices/addToCartSlice";
import { useSession } from "next-auth/react";

type IProductCard = {
  credential: ProductDataType;
};

export default function ProductCard({ credential }: IProductCard) {
  const { data } = useSession();

  const dispatch = useAppDispatch();
  const discountedPrice =
    Number(credential.productPrice.slice(1)) *
    (1 - Number(credential.productDiscount) / 100);

  const navigate = useRouter();

  const handleAddToCart = (product: ProductDataType) => {
    const CartData = {
      qty: 1,
      buyerEmail: data?.user.email,
      buyer_name: data?.user.name,
      ...product,
    };
    dispatch(setCart(CartData));
  };
  return (
    <section className="flex flex-col bg-[#F4F5F7] relative cursor-pointer group rounded-lg">
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <div
        onClick={() => navigate.push(`/shop/${credential._id}`)}
        className=" flex-col justify-center items-center absolute top-0 w-full h-full bg-gray-50/50 group-hover:flex hidden"
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(credential);
          }}
          textContent="Add to cart"
          className="bg-[#FFFFFF] w-[200px] h-10 text-[#B88E2F] font-bold"
        />
      </div>
      <span className="bg-[#E97171] rounded-full flex flex-col h-fit justify-center items-center absolute right-6 top-8 p-1 text-white ">
        {credential.productDiscount}%
      </span>
      <Image
        src={credential.productImgUrl[0].url}
        alt=""
        height={300}
        width={300}
        className="w-full object-cover rounded-t-lg"
        style={{ maxHeight: 300 }}
      />
      <div className="mt-auto p-2">
        <p className="font-bold">{credential.productName}</p>
        <p className="truncate">{credential.Description}</p>
        <span className="flex justify-between items-center">
          <p className="font-bold">{credential.productPrice}</p>
          <p className="">{discountedPrice.toFixed(2)}</p>
        </span>
      </div>
    </section>
  );
}
