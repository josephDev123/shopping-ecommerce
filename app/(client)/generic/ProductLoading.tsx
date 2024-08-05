"use client";

import Button from "./Button";

export default function ProductCardLoading() {
  return (
    <section className="border border-blue-400 rounded-md min-w-[300px] bg-white">
      <section className="flex animate-pulse flex-col relative cursor-pointer ">
        {/* <div className=" flex-col justify-center items-center absolute top-0 w-full h-full  ">
          <Button
            textContent=""
            className=" w-[200px]  text-[#B88E2F] font-bold"
          />
        </div> */}
        <span className="bg-gray-700 rounded-full flex h-5 w-5 flex-col justify-center items-center absolute right-6 top-8 p-1 text-white "></span>

        <div className="bg-gray-700 h-72 w-full"></div>
        <div className=" p-2">
          <p className="font-bold bg-slate-700 h-3"></p>
          <p className="truncate bg-slate-700 h-3 w-full"></p>
          <span className="flex justify-between items-center">
            <p className="font-bold bg-slate-700 h-3 w-3"></p>
            <p className="bg-slate-700 h-3 w-3"></p>
          </span>
        </div>
      </section>
    </section>
  );
}
