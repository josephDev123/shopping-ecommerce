import FilterIcons from "@/app/svgComponent/FilterIcons";
import { PiDotsSixBold } from "react-icons/pi";
import BiviewList from "@/app/svgComponent/Bi_view-list";
import { GoHorizontalRule } from "react-icons/go";
import ThingsToEnjoy from "../../generic/ThingsToEnjoy";
import Banner from "../../generic/Banner";
import ProductListSection from "./components/ProductListSection";
import { ProductDataType } from "@/app/types/productsType";
import { Suspense } from "react";
import Loading from "../../generic/ComponentLoading";
import ItemLimit from "./components/ItemLimit";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const links = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 4;

  // // console.log(page, limit);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    // Handle errors

    return (
      <div className="flex flex-col h-56 justify-center items-center ">
        Error fetching product data
      </div>
    );
  }

  const result = await response.json();
  console.log("real data:", result);

  return (
    <section className="flex flex-col h-full">
      <Banner title="Shop" links={links} />
      <div className="flex sm:flex-row gap-2 flex-col sm:items-center justify-around bg-[#F9F1E7] h-fit py-1 px-2">
        <div className="flex md:flex-row sm:flex-col flex-row gap-2 items-start justify-start sm:order-1 order-2 min-[375px]:text-base text-sm">
          <span className="flex  items-center">
            <FilterIcons />
            <span className="font-bold">Filter</span>
            <PiDotsSixBold className="text-xl font-bold" />
            <BiviewList />
            <GoHorizontalRule className="rotate-90" />
          </span>

          <p className="">
            Showing {page}–{page * limit} of {result?.data?.totalDoc || 0}{" "}
            results
          </p>
        </div>

        <ItemLimit />
      </div>
      <pre>{JSON.stringify(result)}</pre>

      <Suspense fallback={<Loading />}>
        <ProductListSection
          data={result?.data}
          itemsNumber={result?.data?.totalDoc}
        />
      </Suspense>

      <ThingsToEnjoy />
    </section>
  );
}
