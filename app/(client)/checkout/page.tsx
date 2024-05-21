import React from "react";
import Banner from "../generic/Banner";
import Input from "../generic/Input";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Checkout", url: "/checkout" },
  ];
  return (
    <section className="flex flex-col w-full h-full">
      <Banner title="Checkout" links={links} />
      <div className="grid grid-cols-2 gap-4 w-[80%] mx-auto my-10">
        <div className="w-full">
          <h2 className="font-bold text-xl">Billing details</h2>
          <form
            action=""
            method="post"
            className="mt-4 flex flex-col space-y-4"
          >
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
          </form>
        </div>
      </div>
    </section>
  );
}
