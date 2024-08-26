import React from "react";
import Banner from "../generic/Banner";
import ThingsToEnjoy from "../generic/ThingsToEnjoy";
import CheckoutTable from "./components/CheckoutTable";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Checkout", url: "/checkout" },
  ];
  return (
    <section className="flex flex-col w-full h-full">
      <Banner title="Checkout" links={links} />
      <div className=" min-[1136px]::w-[80%] w-[90%] mx-auto my-10">
        <h2 className="font-bold text-xl">Billing details</h2>
        <CheckoutTable />
      </div>
      <ThingsToEnjoy />
    </section>
  );
}
