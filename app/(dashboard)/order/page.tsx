import React from "react";
import Navbar from "./components/Navbar";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import Button from "@/app/(client)/generic/Button";
import { MdArrowDropDown, MdOutlineArrowDropDownCircle } from "react-icons/md";
import FooterPagination from "../commons/FooterPagination";
import OrderPageMainWrapper from "./components/OrderPageMainWrapper";

export interface OrderPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function page({ searchParams }: OrderPageProps) {
  return (
    <section className="flex flex-col p-2 h-full">
      {/* <h1 className="font-bold text-xl my-2">Order Management</h1>
      <Navbar searchParams={searchParams} />
      <OrderPageMainWrapper /> */}
    </section>
  );
}
