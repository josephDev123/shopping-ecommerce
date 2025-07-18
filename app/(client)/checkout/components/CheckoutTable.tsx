"use client";

import React, { FormEventHandler, useRef, useState } from "react";
import Button from "../../generic/Button";
import { GoDotFill } from "react-icons/go";
import Input, { SelectInput } from "../../generic/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/app/zod-schema/checkoutSchema";
import { z } from "zod";
import { useAppSelector } from "@/lib/slices/hooks";
import axios from "axios";
import { generateUniquePaymentID } from "@/app/utils/randomCharacters";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/axiosInstance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

export default function CheckoutTable() {
  const { data: user } = useSession();

  const [name, setName] = useState(user?.user.name.split(" "));
  const [email, setEmail] = useState(user?.user.email);
  type CheckoutFormDataType = z.infer<typeof checkoutSchema>;
  const navigate = useRouter();
  const getCarts = useAppSelector((state) => state.cartState.carts);
  console.log(getCarts);
  // const discount = getCarts.reduce((acc, currentValue) => {
  //   return (acc = +currentValue.productDiscount);
  // }, 0);

  // const subtotal = getCarts.reduce((acc, currentValue) => {
  //   const qty = currentValue ? currentValue?.qty : 1;
  //   const result = (acc = +currentValue.productPrice);
  //   return result * Number(qty);
  // }, 0);

  // const discountCalc = (subtotal * discount) / 100;
  // const total = subtotal - discountCalc;

  const { totalPrice, totalDiscount } = getCarts.reduce(
    (acc, item) => {
      const qty = item?.qty ?? 0;
      const price = +item.productPrice || 0;
      const discountPercent = +item.productDiscount || 0;

      const itemTotal = price * Number(qty);
      const itemDiscount = itemTotal * (discountPercent / 100);

      acc.totalPrice += itemTotal;
      acc.totalDiscount += itemDiscount;

      return acc;
    },
    { totalPrice: 0, totalDiscount: 0 }
  );

  const subtotal = totalPrice - totalDiscount;

  console.log("Total price before discount:", totalPrice);
  console.log("Total discount amount:", totalDiscount);
  console.log("Subtotal after discount:", subtotal);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<CheckoutFormDataType>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout: SubmitHandler<CheckoutFormDataType> = async (data) => {
    try {
      if (errors.paymentMethod) {
        toast.error(errors.paymentMethod.message, { position: "top-center" });
        return;
      }
      if (data.paymentMethod !== "Direct Bank Transfer") {
        toast.error("payment method not Supported yet");
        return;
      }

      // if (!user?.user.email) {
      //   toast.error("login to checkout");
      //   return navigate.push("/login");
      // }
      // if (data.paymentMethod === "Direct Bank Transfer") {
      const response = await axiosInstance({
        url: "api/checkout",
        method: "post",
        data: {
          user_id: user?.user.id,
          tx_ref: generateUniquePaymentID("user123"),
          amount: subtotal,
          currency: "NGN",
          redirect_url: "http://localhost:3000/success",
          customer_billing: {
            email: data.email,
            name: data.firstName + " " + data.lastName,
            phonenumber: data.phone,
            companyName: data.companyName,
            country: data.country,
            address: data.streetAddress,
            town: data.townCity,
            province: data.province,
            zipCode: data.zipCode,
            additionalInfo: data.additionalInfo,
            paymentMethod: data.paymentMethod,
          },
          // item: getCarts.map((product) => product._id),
          item: getCarts,
          customizations: {
            title: "Shopping Standard Payment",
          },
        },
      });

      const result = await response.data.message;
      console.log(result);
      if (result.status === "success") {
        return (window.location.href = result.data.link);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred, please try again");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleCheckout)}
      className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-10"
    >
      {/* {JSON.stringify(name)} */}
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex sm:flex-row flex-col gap-4 w-full">
          <div className="flex flex-col w-full">
            <Input
              type="text"
              labelName="First Name"
              errorLabel=""
              className="rounded-md border p-4 outline-none w-full"
              register={register}
              name="firstName"
              defaultValue={name && name[0]}
            />
            <small className="text-red-400">
              {errors && errors.firstName?.message}
            </small>
          </div>

          <div className="flex flex-col w-full">
            <Input
              type="text"
              labelName="Last Name"
              errorLabel=""
              register={register}
              name="lastName"
              defaultValue={name && name[1] && name[1]}
              className="rounded-md border p-4 outline-none w-full"
            />
            <small className="text-red-400">
              {errors && errors.lastName?.message}
            </small>
          </div>
        </div>

        <div className="w-full">
          <Input
            type="text"
            labelName="Company Name (Optional)"
            errorLabel=""
            register={register}
            name="companyName"
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.companyName?.message}
          </small>
        </div>

        <div className="w-full">
          <SelectInput
            register={register}
            name="country"
            labelName="Country / Region"
            errorLabel=""
            data={["Nigeria", "Ghana", "Togo"]}
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.country?.message}
          </small>
        </div>

        <div className="w-full">
          <Input
            register={register}
            name="streetAddress"
            type="text"
            labelName="Street address"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.streetAddress?.message}
          </small>
        </div>

        <div>
          <Input
            register={register}
            name="townCity"
            type="text"
            labelName="Town / City"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.townCity?.message}
          </small>
        </div>
        <div>
          <Input
            register={register}
            name="province"
            type="text"
            labelName="Province"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.province?.message}
          </small>
        </div>

        {/* <SelectInput
         {...register("provic")}
          labelName="Province"
          errorLabel=""
          data={[]}
          className="rounded-md border p-4 outline-none w-full"
        /> */}
        <div>
          <Input
            register={register}
            name="zipCode"
            type="number"
            labelName="ZIP code"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.zipCode?.message}
          </small>
        </div>

        <div>
          <Input
            register={register}
            name="phone"
            type="number"
            labelName="Phone"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.phone?.message}
          </small>
        </div>

        <div>
          <Input
            register={register}
            name="email"
            type="text"
            labelName="Email address"
            errorLabel=""
            defaultValue={email}
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.email?.message}
          </small>
        </div>

        <div>
          <Input
            register={register}
            name="additionalInfo"
            type="text"
            labelName="Additional information"
            placeholder="Additional information"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <small className="text-red-400">
            {errors && errors.additionalInfo?.message}
          </small>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <table>
          <thead>
            <tr className="text-left">
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {getCarts.map((cart, i) => (
              <tr key={i}>
                <td>
                  {cart.productName} <small className="text-sm">❌</small>{" "}
                  {cart.qty}
                </td>
                <td>
                  <td>
                    {Number(cart.productPrice)}
                    <small className="text-sm"> * </small>
                    {Number(cart.qty)}
                  </td>
                </td>
              </tr>
            ))}

            <tr>
              <td className="font-medium">Subtotal</td>
              <td>{subtotal}</td>
            </tr>

            <tr>
              <td className="font-medium">Total</td>
              <td className="text-[#B88E2F] text-lg font-bold">{totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <hr className="w-full my-4" />
        <div className="flex flex-col">
          <span className="inline-flex gap-2 items-center">
            <GoDotFill />
            <b> Direct Bank Transfer</b>
          </span>

          {/* <p className="mt-2">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p> */}

          <div className="flex items-center gap-2 mt-4">
            <input
              type="radio"
              id=""
              value="Direct Bank Transfer"
              {...register("paymentMethod")}
            />
            <p>Direct Bank Transfer</p>
          </div>
          {/* <div className="flex items-center gap-2">
            <input
              type="radio"
              id=""
              value="Cash On Delivery"
              {...register("paymentMethod")}
            />
            <p>Cash On Delivery</p>
          </div> */}
          {errors.paymentMethod && (
            <small className="text-red-300 font-bold">
              {errors.paymentMethod.message}
            </small>
          )}
        </div>
        <p className="mt-2">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our <b>privacy policy.</b>
        </p>

        <Button
          disabled={isSubmitting}
          type="submit"
          textContent="Place order"
          className="p-3 flex items-center gap-4 justify-center mx-auto border-2 border-black mt-4 rounded-md font-semibold min-[375]:w-80 w-full text-xl"
        >
          {isSubmitting && (
            <AiOutlineLoading3Quarters className="animate-spin items-end" />
          )}
        </Button>
      </div>
    </form>
  );
}
