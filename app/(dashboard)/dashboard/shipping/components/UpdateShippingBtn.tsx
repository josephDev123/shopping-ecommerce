import { Row } from "@tanstack/react-table";
import { Shipping } from "../type/ApiShipping";
import UpdateShipping from "./UpdateShipping";
import { useState } from "react";

export default function UpdateShippingBtn({ row }: { row: Row<Shipping> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-500  rounded-md p-1.5 text-white inline-flex flex-nowrap w-40 justify-center "
      >
        Update progress
      </button>
      <UpdateShipping row={row} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
