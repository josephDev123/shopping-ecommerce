"use client";

import { MouseEvent, MouseEventHandler } from "react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { Images } from "@/app/Images";
import { IoIosClose, IoIosCloseCircle } from "react-icons/io";
import Button from "../generic/Button";

interface ISideBarCart {
  closeSideBar: () => void;
}

export default function SideBarCart({ closeSideBar }: ISideBarCart) {
  const handleCloseSideBarOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "sideBar") {
      closeSideBar();
    }
  };

  return (
    <section
      id="sideBar"
      onClick={handleCloseSideBarOverlay}
      className="fixed inset-0 z-50 flex flex-col w-full h-full bg-transparent/15"
    >
      <div className="flex flex-col w-[400px] bg-white self-end p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Shopping Cart</h2>
          <IoCartOutline />
        </div>
        <hr className="mt-2 mb-10" />
        <div className="flex items-center justify-between">
          <div className="h-[100px] w-[108px] rounded-md relative block">
            <Image src={Images.productCat2} fill objectFit="cover" alt="" />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Asgaard sofa</p>
            <p>
              1 x <span className="text-[#B88E2F]">usd. 250,000.00</span>
            </p>
          </div>
          <IoIosClose className="text-2xl hover:bg-[#B88E2F] rounded-full cursor-pointer" />
        </div>

        <div className="mt-40 flex flex-col">
          <div className="flex items-center gap-4">
            <h3 className="font-medium">Subtotal</h3>
            <p className="text-[#B88E2F] font-medium">usd. 250,000.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex items-center gap-4">
            <Button
              textContent="Cart"
              className="border border-black rounded-full py-0.5 px-3 hover:bg-[#bdac82]"
            />
            <Button
              textContent="Checkout"
              className="border border-black rounded-full py-0.5 px-3 hover:bg-[#bdac82]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
