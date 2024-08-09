"use client";

import React, { useState } from "react";
import ProductDescription from "./ProductDescription";
import AdditionalInformation from "./AdditionalInformation";
import Reviews from "./Reviews";

export default function ShopDetailSection() {
  const [expand, setExpand] = useState("");
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-center items-center gap-8 py-10">
        <h3
          className={`text-lg cursor-pointer ${
            expand === "description" && "font-bold"
          }`}
          onClick={() => setExpand("description")}
        >
          Description
        </h3>
        <h3
          className={`text-lg cursor-pointer ${
            expand === "additional_Information" && "font-bold"
          }`}
          onClick={() => setExpand("additional_Information")}
        >
          Additional Information
        </h3>
        <h3
          className={`text-lg cursor-pointer ${
            expand === "reviews" && "font-bold"
          }`}
          onClick={() => setExpand("reviews")}
        >
          Reviews(5)
        </h3>
      </div>
      <div className="flex justify-center w-[70%] mx-auto mb-4">
        {expand === "description" && <ProductDescription />}
        {expand === "additional_Information" && <AdditionalInformation />}
        {expand === "reviews" && <Reviews />}
      </div>
    </div>
  );
}
