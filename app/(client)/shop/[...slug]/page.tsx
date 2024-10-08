import React, { useState } from "react";
import Button from "../../generic/Button";
import { productCardData } from "@/app/data/productCardData";
import ShopHeading from "./components/ShopHeading";
import ShopDetailSection from "./components/ShopDetailSection";
import ShopItemPreview from "./components/ShopItemPreview";
import { ProductResponseType } from "@/app/types/productsType";

interface pageProps {
  params: {
    slug: string[];
  };
}

// ${process.env.SERVER_BASEURL}
export default async function Page({ params }: pageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/get-product?product_id=${params.slug[0]}`
  );

  if (!response.ok) {
    // Handle errors
    console.error("Failed to fetch data:", response.statusText);
    return <div>Error fetching data</div>;
  }
  const result: ProductResponseType = await response.json();

  return (
    <section className="flex flex-col w-full h-full">
      <ShopHeading data={result} />
      <ShopItemPreview data={result} />
      <ShopDetailSection data={result} />
      <hr />

      <hr className="py-6" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl mb-10">Related Products</h2>
        <div className="grid grid-cols-4 gap-4 w-[80%] mx-auto ">
          {productCardData.map((product, i) => (
            // <ProductCard key={i} credential={product} />
            <></>
          ))}
        </div>
        <Button
          textContent="Show More"
          className="my-5 border border-[#B88E2F] text-[#B88E2F] font-medium w-[245px] h-12"
        />
      </div>
    </section>
  );
}
