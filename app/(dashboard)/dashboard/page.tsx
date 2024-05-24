import React from "react";
import { MdOutlineArrowUpward } from "react-icons/md";

export default function Page() {
  return (
    <section className="flex flex-col p-2">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Total Sales & Costs</h2>
          <p className="">Last 7 days</p>
          <div className="flex items-center gap-4 mt-6">
            <h2 className="text-xl font-bold">$350K</h2>{" "}
            <h2 className="text-lg text-[#0FB7FF] font-bold">$235K</h2>
          </div>
          <div className="flex items-center">
            <span className="flex gap-1 items-center">
              <MdOutlineArrowUpward className="text-[#1EB564]" />
              <p className="text-[#1EB564]">8.56K</p>
              <p>vs last 7 days</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
