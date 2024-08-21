import FilterIcons from "@/app/svgComponent/FilterIcons";
import { PiDotsSixBold } from "react-icons/pi";
import BiviewList from "@/app/svgComponent/Bi_view-list";
import { GoHorizontalRule } from "react-icons/go";
import ThingsToEnjoy from "../../generic/ThingsToEnjoy";
import Banner from "../../generic/Banner";
import ProductListSection from "./components/ProductListSection";
import { ProductDataType } from "@/app/types/productsType";

export type ILink = {
  name: string;
  url: string;
};
export default async function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products?limit=8&page=2`
  );

  if (!response.ok) {
    // Handle errors
    console.error("Failed to fetch data:", response.statusText);
    return <div>Error fetching data</div>;
  }

  const result: ProductDataType[] = await response.json();

  return (
    <section className="flex flex-col">
      <Banner title="Shop" links={links} />
      {/* h-[100px] */}
      <div className="flex sm:flex-row gap-2 flex-col sm:items-center justify-around bg-[#F9F1E7] h-fit py-1 px-2">
        <div className="flex md:flex-row sm:flex-col flex-row gap-2 items-start justify-start sm:order-1 order-2 min-[375px]:text-base text-sm">
          <span className="flex  items-center">
            <FilterIcons />
            <span className="font-bold">Filter</span>
            <PiDotsSixBold className="text-xl font-bold" />
            <BiviewList />
            <GoHorizontalRule className="rotate-90" />
          </span>

          <p className="">Showing 1–16 of 32 results</p>
        </div>

        <div className="flex items-center gap-6 sm:order-2 order-1">
          <div className="flex items-center gap-4">
            <b className="min-[375px]:text-sm">Show</b>
            <input
              type="number"
              placeholder="0"
              name=""
              id=""
              className="min-[375px]:w-16 min-[375px]:h-10 w-12 h-6 rounded-md outline-none px-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <b className="min-[375px]:text-sm">Sort by</b>
            <input
              type="search"
              placeholder="Default"
              name=""
              id=""
              className="min-[375px]:w-28 min-[375px]:h-10 w-24 h-7 rounded-md outline-none px-1"
            />
          </div>
        </div>
      </div>
      {JSON.stringify(result)}
      <ProductListSection data={result} />

      <ThingsToEnjoy />
    </section>
  );
}
