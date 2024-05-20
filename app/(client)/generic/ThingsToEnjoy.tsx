import Customer_support from "@/app/svgComponent/Customer_support";
import Freeshipping from "@/app/svgComponent/Freeshipping";
import Guarantee from "@/app/svgComponent/Guarantee";
import TrophyIcon from "@/app/svgComponent/TrophyIcon";
import React from "react";

export default function ThingsToEnjoy() {
  return (
    <section className="h-[260px] bg-[#FAF3EA] grid grid-cols-4 items-center mx-auto w-full pl-10  mt-10">
      <div className="flex gap-2">
        <TrophyIcon className="text-red-300" />
        <div className="flex flex-col">
          <h3 className="font-bold">High Quality</h3>
          <p className="text-gray-600">crafted from top materials</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Guarantee className="text-red-300" />
        <div className="flex flex-col">
          <h3 className="font-bold"> Warranty Protection</h3>
          <p className="text-gray-600">Over 2 years</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Freeshipping className="text-red-300" />
        <div className="flex flex-col">
          <h3 className="font-bold">Free Shipping</h3>
          <p className="text-gray-600">Order over 150 $</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Customer_support className="text-red-300" />

        <div className="flex flex-col">
          <h3 className="font-bold">24 / 7 Support</h3>
          <p className="text-gray-600">Dedicated support</p>
        </div>
      </div>
    </section>
  );
}
