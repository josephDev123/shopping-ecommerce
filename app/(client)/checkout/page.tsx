import React from "react";
import Banner from "../generic/Banner";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Checkout", url: "/checkout" },
  ];
  return (
    <section className="flex flex-col w-full h-full">
      <Banner title="Checkout" links={links} />
    </section>
  );
}
