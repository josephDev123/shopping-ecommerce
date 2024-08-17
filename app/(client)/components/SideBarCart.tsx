"use client";

import { MouseEvent, MouseEventHandler } from "react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { Images } from "@/app/Images";
import { IoIosClose, IoIosCloseCircle } from "react-icons/io";
import Button from "../generic/Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/slices/hooks";

interface ISideBarCart {
  closeSideBar: () => void;
}

export default function SideBarCart({ closeSideBar }: ISideBarCart) {
  const getCarts = useAppSelector((state) => state.cartState.carts);
  const handleCloseSideBarOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "sideBar") {
      closeSideBar();
    }
  };

  const navigate = useRouter();

  return (
    <section
      id="sideBar"
      onClick={handleCloseSideBarOverlay}
      className="fixed inset-0 z-50 flex flex-col w-full h-full bg-transparent/15"
    >
      <div className="flex flex-col min-[425px]:w-[400px] w-full bg-white self-end p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Shopping Cart</h2>
          <IoCartOutline />
        </div>
        <hr className="mt-2 mb-10" />
        {getCarts.map((cart, i) => (
          <div
            key={i}
            className="flex sm:flex-row flex-col sm:items-center justify-between"
          >
            <div className="h-[100px] w-[108px] rounded-md relative block">
              <Image
                src={cart.productImgUrl[0].url}
                fill
                objectFit="cover"
                alt=""
              />
              {/* <img src={cart.productImgUrl[0].url} alt="" /> */}
            </div>
            <div className="flex flex-col">
              <p className="font-medium  text-ellipsis overflow-hidden whitespace-nowrap sm:max-w-[200px] max-w-[300px] ">
                {cart.productName}
              </p>
              <p>
                1 x{" "}
                <span className="text-[#B88E2F]">usd. {cart.productPrice}</span>
              </p>
            </div>
            <IoIosClose className="text-2xl hover:bg-[#B88E2F] rounded-full cursor-pointer" />
          </div>
        ))}

        <div className="mt-40 flex flex-col">
          <div className="flex items-center gap-4">
            <h3 className="font-medium">Subtotal</h3>
            <p className="text-[#B88E2F] font-medium">usd. 250,000.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                navigate.push("/cart");
                closeSideBar();
              }}
              textContent="Cart"
              className="border border-black rounded-full py-0.5 px-3 hover:bg-[#bdac82]"
            />
            <Button
              onClick={() => {
                navigate.push("/checkout");
                closeSideBar();
              }}
              textContent="Checkout"
              className="border border-black rounded-full py-0.5 px-3 hover:bg-[#bdac82]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
