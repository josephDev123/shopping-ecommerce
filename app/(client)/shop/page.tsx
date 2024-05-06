import FilterIcons from "@/app/svgComponent/FilterIcons";
import ActiveInLineLink from "./component/ActiveInLineLink";
import bannerImage from "./style/shop.module.css";
import { PiDotsSixBold } from "react-icons/pi";
import BiviewList from "@/app/svgComponent/Bi_view-list";
import { GoHorizontalRule } from "react-icons/go";
import { productCardData } from "@/app/data/productCardData";
import ProductCard from "../generic/ProductCard";
import TrophyIcon from "@/app/svgComponent/TrophyIcon";
import Guarantee from "@/app/svgComponent/Guarantee";
import Freeshipping from "@/app/svgComponent/Freeshipping";
import Customer_support from "@/app/svgComponent/Customer_support";

export type ILink = {
  name: string;
  url: string;
};
export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];
  return (
    <section className="flex flex-col">
      <div
        className={`h-[320px] w-full  flex flex-col justify-center items-center ${bannerImage.bg}`}
      >
        <h1 className="text-3xl font-bold mb-1">Shop</h1>
        <ActiveInLineLink items={links} />
      </div>

      <div className="flex items-center justify-around bg-[#F9F1E7] h-[100px]">
        <div className="flex gap-2 items-center">
          <FilterIcons />
          <span className="font-bold">Filter</span>
          <PiDotsSixBold className="text-xl font-bold" />
          <BiviewList />
          <GoHorizontalRule className="rotate-90 h-56" />
          <p>Showing 1–16 of 32 results</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <b>Show</b>
            <input
              type="number"
              placeholder="0"
              name=""
              id=""
              className="w-16 h-10 rounded-md outline-none px-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <b>Sort by</b>
            <input
              type="search"
              placeholder="Default"
              name=""
              id=""
              className="w-28 h-10 rounded-md outline-none px-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 my-14 w-[80%] mx-auto">
        {productCardData.map((item, i) => (
          <ProductCard key={i} credential={item} />
        ))}
      </div>

      <div className="flex gap-5 items-center justify-center mb-6">
        <button className="rounded-md p-2 bg-[#B88E2F] px-4 py-2 text-white font-medium">
          1
        </button>
        <button className="rounded-md p-2 bg-[#F9F1E7] px-4 py-2 font-medium">
          2
        </button>
        <button className="rounded-md p-2 bg-[#F9F1E7] px-4 py-2 font-medium">
          3
        </button>
        <button className="rounded-md p-2 bg-[#F9F1E7] px-4 py-2 font-medium">
          Next
        </button>
      </div>

      <div className="h-[260px] bg-[#FAF3EA] grid grid-cols-4 items-center mx-auto w-full pl-10">
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
      </div>
    </section>
  );
}
