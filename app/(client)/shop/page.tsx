import FilterIcons from "@/app/svgComponent/FilterIcons";
import ActiveInLineLink from "./component/ActiveInLineLink";
import bannerImage from "./style/shop.module.css";
import { PiDotsSixBold } from "react-icons/pi";
import BiviewList from "@/app/svgComponent/Bi_view-list";
import { GoHorizontalRule } from "react-icons/go";

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
              type="search"
              name=""
              id=""
              className="w-16 h-10 rounded-md outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <b>Sort by</b>
            <input
              type="search"
              name=""
              id=""
              className="w-28 h-10 rounded-md outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
