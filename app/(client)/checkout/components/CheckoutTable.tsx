"use client";

import React from "react";
import Button from "../../generic/Button";
import { GoDotFill } from "react-icons/go";
import Input, { SelectInput } from "../../generic/Input";

export default function CheckoutTable() {
  return (
    <form
      action=""
      method="post"
      className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-10"
    >
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex sm:flex-row flex-col gap-4 w-full">
          <Input
            name=""
            type="text"
            labelName="First Name"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
          <Input
            name=""
            type="text"
            labelName="Last Name"
            errorLabel=""
            className="rounded-md border p-4 outline-none w-full"
          />
        </div>

        <Input
          name=""
          type="text"
          labelName="Company Name (Optional)"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />

        <SelectInput
          name=""
          labelName="Country / Region"
          errorLabel=""
          data={[]}
          className="rounded-md border p-4 outline-none w-full"
        />

        <Input
          name=""
          type="text"
          labelName="Street address"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />

        <Input
          name=""
          type="text"
          labelName="Town / City"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />

        <Input
          name=""
          type="text"
          labelName="Province"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />

        <SelectInput
          name=""
          labelName="Province"
          errorLabel=""
          data={[]}
          className="rounded-md border p-4 outline-none w-full"
        />

        <Input
          name=""
          type="number"
          labelName="ZIP code"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />
        <Input
          name=""
          type="number"
          labelName="Phone"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />

        <Input
          name=""
          type="text"
          labelName="Email address"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />
        <Input
          name=""
          type="text"
          labelName="Additional information"
          placeholder="Additional information"
          errorLabel=""
          className="rounded-md border p-4 outline-none w-full"
        />
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
            <tr>
              <td>Asgaard sofa * 2</td>
              <td>Rs. 250,000.00</td>
            </tr>
            <tr>
              <td className="font-medium">Subtotal</td>
              <td>Rs. 250,000.00</td>
            </tr>

            <tr>
              <td className="font-medium">Total</td>
              <td className="text-[#B88E2F] text-lg font-bold">
                Rs. 250,000.00
              </td>
            </tr>
          </tbody>
        </table>
        <hr className="w-full my-4" />
        <div className="flex flex-col">
          <span className="inline-flex gap-2 items-center">
            <GoDotFill />
            <b> Direct Bank Transfer</b>
          </span>

          <p className="mt-2">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>

          <div className="flex items-center gap-2 mt-4">
            <input type="radio" name="" id="" />
            <p>Direct Bank Transfer</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" name="" id="" />
            <p>Cash On Delivery</p>
          </div>
        </div>
        <p className="mt-2">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our <b>privacy policy.</b>
        </p>

        <Button
          textContent="Place order"
          className="p-3 mx-auto border-2 border-black mt-4 rounded-md font-semibold min-[375]:w-80 w-full text-xl"
        />
      </div>
    </form>
  );
}
