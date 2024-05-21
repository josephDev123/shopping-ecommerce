import React from "react";
import Banner from "../generic/Banner";
import Input, { SelectInput } from "../generic/Input";
import Button from "../generic/Button";
import { GoDotFill } from "react-icons/go";
import ThingsToEnjoy from "../generic/ThingsToEnjoy";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Checkout", url: "/checkout" },
  ];
  return (
    <section className="flex flex-col w-full h-full">
      <Banner title="Checkout" links={links} />
      <div className=" w-[80%] mx-auto my-10">
        <h2 className="font-bold text-xl">Billing details</h2>
        <form action="" method="post" className="mt-4 grid grid-cols-2 gap-10">
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex gap-4 w-full">
              <Input
                type="text"
                labelName="First Name"
                errorLabel=""
                className="rounded-md border p-4 outline-none"
              />
              <Input
                type="text"
                labelName="Last Name"
                errorLabel=""
                className="rounded-md border p-4 outline-none"
              />
            </div>

            <Input
              type="text"
              labelName="Company Name (Optional)"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />

            <SelectInput
              labelName="Country / Region"
              errorLabel=""
              data={[]}
              className="rounded-md border p-4 outline-none"
            />

            <Input
              type="text"
              labelName="Street address"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />

            <Input
              type="text"
              labelName="Town / City"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />

            <Input
              type="text"
              labelName="Province"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />

            <SelectInput
              labelName="Province"
              errorLabel=""
              data={[]}
              className="rounded-md border p-4 outline-none"
            />

            <Input
              type="number"
              labelName="ZIP code"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />
            <Input
              type="number"
              labelName="Phone"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />

            <Input
              type="text"
              labelName="Email address"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
            />
            <Input
              type="text"
              labelName="Additional information"
              placeholder="Additional information"
              errorLabel=""
              className="rounded-md border p-4 outline-none"
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
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
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
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <b>privacy policy.</b>
            </p>

            <Button
              textContent="Place order"
              className="p-3 mx-auto border-2 border-black mt-4 rounded-md mt-4 font-semibold  w-80 text-xl"
            />
          </div>
        </form>
      </div>
      <ThingsToEnjoy />
    </section>
  );
}
