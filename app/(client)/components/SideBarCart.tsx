"use client";

import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
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
  const total = getCarts.reduce((acc, cart) => {
    return acc + Number(cart.productPrice) * cart.productQuantity;
  }, 0);

  const disCountPercentage = getCarts.reduce(
    (acc, Cart) => acc + Number(Cart.productDiscount),
    0
  );
  const discountAmount = (total * disCountPercentage) / 100;
  const subtotal = total - discountAmount;

  return (
    <section
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
          getCarts.map((cart, i) => (
            <div
              key={i}
              className="flex sm:flex-row flex-col sm:items-center justify-between "
            >
              <div className="h-[100px] w-[108px] rounded-md relative block ">
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
                  <span className="text-[#B88E2F]">
                    usd. {cart.productPrice}
                  </span>
                </p>
              </div>
              <IoIosClose className="text-2xl hover:bg-[#B88E2F] rounded-full cursor-pointer" />
            </div>
          ))
        )}

        {getCarts.length >= 1 && (
          <div className="flex flex-col">
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
    </section>
  );
}
