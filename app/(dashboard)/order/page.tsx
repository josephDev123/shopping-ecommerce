import React from "react";
import Navbar from "./components/Navbar";

export default function page() {
  return (
    <section className="flex flex-col p-2">
      <h1 className="font-bold text-xl my-2">Order Management</h1>
      <Navbar />
    </section>
  );
}
