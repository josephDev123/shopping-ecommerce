"use client";

import React, { useState } from "react";
import ProductDescription from "./ProductDescription";
import AdditionalInformation from "./AdditionalInformation";
import Reviews from "./Reviews";
import { ProductResponseType } from "@/app/types/productsType";
import { FullProduct } from "@/app/types/productWithRelatedItem";
import Dialog from "@/app/(client)/generic/Modal/Dialogs";

interface ShopDetailSectionProps {
  // data: ProductResponseType;

  data: FullProduct;
}
export default function ShopDetailSection({ data }: ShopDetailSectionProps) {
  const [expand, setExpand] = useState("description");
  const [rate, setRate] = useState("");
  console.log(rate);
  const productDataArray = Array.isArray(data) ? data : [data];
  const product = productDataArray[0] as FullProduct;
  return (
    <div className="flex flex-col w-full h-full  ">
      <div className="flex justify-center  w-full items-center  gap-8 py-5 px-4">
        <h3
          className={`text-lg cursor-pointer ${
            expand === "description" && "font-bold underline underline-offset-1"
          }`}
          onClick={() => setExpand("description")}
        >
          Description
        </h3>
        {/* <h3
          className={`text-lg cursor-pointer ${
            expand === "additional_Information" && "font-bold"
          }`}
          onClick={() => setExpand("additional_Information")}
        >
          Additional Information
        </h3> */}
        <h3
          className={`text-lg cursor-pointer ${
            expand === "reviews" && "font-bold  underline underline-offset-1"
          }`}
          onClick={() => setExpand("reviews")}
        >
          Reviews
        </h3>
      </div>
      <div className="flex justify-center w-[70%] mx-auto mb-4">
        {expand === "description" && (
          <ProductDescription description={product.Description} />
        )}
        {/* {expand === "additional_Information" && <AdditionalInformation />} */}
        {expand === "reviews" && (
          <div className="w-full">
            <Dialog>
              <Dialog.ModalTrigger>
                <button type="button" className="mb-1">
                  Add Rate⭐
                </button>
              </Dialog.ModalTrigger>
              <Dialog.Modal OverLayClass="">
                <Reviews setValue={setRate} value={rate} />
              </Dialog.Modal>
            </Dialog>
            <textarea
              rows={6}
              className="w-full p-2 rounded-md border"
              placeholder="Rate your experience (1–5) and add a short comment (pros/cons)."
            />
          </div>
        )}
      </div>
    </div>
  );
}
