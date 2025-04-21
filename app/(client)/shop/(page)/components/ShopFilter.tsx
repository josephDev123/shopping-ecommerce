"use client";

import AnimateInPanel from "@/app/(client)/generic/AnimateInPanel";
import FilterIcons from "@/app/svgComponent/FilterIcons";
import React, { useState } from "react";
import { GoHorizontalRule } from "react-icons/go";

// interface ShopFilterProps {
//   onClick: () => void;
// }
export default function ShopFilter() {
  const [visible, setVisible] = useState<"hidden" | "visible">("hidden");
  const variants = {
    visible: {
      opacity: 1,
      x: 1,
      y: 1,
      transition: { duration: 0.5, staggerChildren: 0.07, delayChildren: 0.2 },
    },
    hidden: {
      opacity: 0,
      x: -10,
      y: -10,
      transition: { duration: 0.5, staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const childrenVariants = {
    visible: { opacity: 1, x: 1, y: 1 },
    hidden: { opacity: 0, x: -1, y: -1 },
  };
  return (
    <>
      <span
        className="flex  items-center cursor-pointer h-fit"
        onClick={() => setVisible("visible")}
      >
        <FilterIcons />
        <span className="font-bold">Filter</span>
        {/* <PiDotsSixBold className="text-xl font-bold" /> */}
        {/* <BiviewList /> */}
        <GoHorizontalRule className="rotate-90" />
      </span>

      <AnimateInPanel
        state={visible}
        closeModal={() => setVisible("hidden")}
        parentVariants={variants}
        childVariants={childrenVariants}
      >
        <div className="flex flex-col h-full text-black text-center p-4 bg-white">
          Shop Filter Coming soon ...
        </div>
      </AnimateInPanel>
    </>
  );
}
