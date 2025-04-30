"use client";

import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import Button from "../generic/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/slices/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { deleteCart } from "@/lib/slices/addToCartSlice";

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
  const dispatch = useAppDispatch();
  const total = getCarts.reduce(
    (acc, cart) => acc + Number(cart.productPrice) * Number(cart.qty),
    0
  );

  const disCountPercentage = getCarts.reduce(
    (acc, Cart) => acc + Number(Cart.productDiscount),
    0
  );
  const discountAmount = (total * disCountPercentage) / 100;
  const subtotal = total - discountAmount;

  const handleRemoveCart = (id: string) => () => {
    dispatch(deleteCart(id));
  };

  // console.log(getCarts);
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        id="sideBar"
        onClick={handleCloseSideBarOverlay}
        className="fixed inset-0 z-50 flex flex-col w-full h-full bg-transparent/15"
      >
        <div className="flex flex-col sm:w-[400px] w-full bg-white self-end p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Shopping Cart</h2>
            <IoCartOutline />
          </div>
          <hr className="mt-2 mb-5" />
          {getCarts.length < 1 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <IoCartOutline className="text-5xl" />
              <p className="text-center">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col  gap-2 h-64 overflow-y-auto">
              {getCarts.map((cart, i) => (
                <div
                  key={i}
                  className="flex sm:flex-row flex-col sm:items-center justify-between relative"
                >
                  <div className="h-[100px] w-[108px]  relative block ">
                    <Image
                      src={cart.productImgUrl[0].url}
                      fill
                      objectFit="cover"
                      alt=""
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium mt-4 text-ellipsis overflow-hidden whitespace-nowrap sm:max-w-[200px] max-w-[300px] ">
                      {cart.productName}
                    </p>
                    <p>
                      {cart.qty} x{" "}
                      <span className="text-[#B88E2F]">
                        usd. {cart.productPrice}
                      </span>
                    </p>
                  </div>
                  <IoIosClose
                    onClick={handleRemoveCart(cart._id)}
                    className="text-2xl hover:bg-[#B88E2F] rounded-full cursor-pointer sm:block hidden"
                  />
                  <IoIosClose className="text-2xl hover:bg-[#B88E2F] rounded-full cursor-pointer sm:hidden absolute bottom-4 right-2" />
                </div>
              ))}
            </div>
          )}

          {getCarts.length >= 1 && (
            <div className="flex flex-col mt-2">
              <div className="flex items-center gap-4">
                <h3 className="font-medium">Subtotal</h3>
                <p className="text-[#B88E2F] font-medium">
                  usd. {subtotal.toFixed(2)}
                </p>
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
          )}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
