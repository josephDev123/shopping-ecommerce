"use client";

import React from "react";
import { MdDelete } from "react-icons/md";
import Button from "../../generic/Button";
import { useAppSelector, useAppDispatch } from "@/lib/slices/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteCart } from "@/lib/slices/addToCartSlice";

export default function CartsDetailSection() {
  const getCarts = useAppSelector((state) => state.cartState.carts);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const handleDiscount = (cartDiscount: string, cartPrice: string) => {
    const originalPrice = Number(cartPrice);
    // Calculate the discount amount (5%)
    const discount = Number(cartPrice) * 0.05;
    // Calculate the final price after applying the discount
    const finalPrice = originalPrice - discount;
    return finalPrice.toFixed(2);
  };

  const discount = getCarts.reduce((acc, currentValue) => {
    return (acc = +currentValue.productDiscount);
  }, 0);

  const totalPrice = getCarts.reduce((acc, currentValue) => {
    const qty = currentValue ? currentValue?.qty : 1;
    const result = (acc = +currentValue.productPrice);
    return result * Number(qty);
  }, 0);

  const discountCalc = (totalPrice * discount) / 100;
  const subtotal = totalPrice - discountCalc;

  return (
    <div className="grid grid-cols-4 gap-4  3xl:w-[80%] w-[90%] mx-auto mt-10">
      {/* {JSON.stringify(getCarts)} */}
      <div className="w-full h-full lg:col-span-3 col-span-full overflow-x-auto">
        <table className="w-full ">
          <thead className="bg-[#F9F1E7] w-full">
            <tr className="w-full">
              <th className="min-w-[100px] py-4 text-left pl-2">img</th>
              <th className="min-w-[100px] py-4 text-left pl-2">Product</th>
              <th className="min-w-[100px] py-4 text-left pl-2">Price</th>
              <th className="min-w-[100px] py-4 text-left pl-2">Quantity</th>
              <th className="min-w-[100px] py-4 text-left pl-2">subtotal</th>
              <th className="min-w-[100px] py-4 text-left pl-2">delete</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {getCarts.length === 0 ? (
              <tr className="h-full w-full ">
                <td className="">No Data</td>
              </tr>
            ) : (
              getCarts.map((cart, i) => (
                <tr key={i} className="w-full">
                  <td className="pl-2">
                    <Image
                      src={cart.productImgUrl[0].url}
                      alt=""
                      width={100}
                      height={100}
                      className="h-[105px] w-[105px] object-contain"
                    />
                  </td>
                  <td className="py-4 pl-2">{cart.productName}</td>
                  <td className="py-4 pl-2">{cart.productPrice}</td>
                  <td className="py-4 pl-2">{cart?.qty}</td>
                  <td className="py-4 pl-2">
                    {handleDiscount(cart.productDiscount, cart.productPrice)}
                  </td>
                  <td className="py-4">
                    <MdDelete
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => dispatch(deleteCart(cart._id))}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-[#F9F1E7] lg:col-span-1 md:col-span-2 col-span-full flex flex-col self-start justify-center items-center py-6">
        <h2 className="font-bold text-xl mb-8">Cart Totals</h2>
        <div className="flex gap-4 items-start ">
          <p>Subtotal</p>
          <p>{totalPrice}</p>
        </div>

        <div className="flex gap-4 items-start ">
          <p>Total</p>
          <p className="text-lg text-[#B88E2F] font-medium">{subtotal}</p>
        </div>
        <Button
          onClick={() => navigate.push("checkout")}
          textContent="Check Out"
          className="border border-black rounded-md py-2 px-6 mt-4"
        />
      </div>
    </div>
  );
}
