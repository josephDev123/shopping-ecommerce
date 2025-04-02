import FilterIcons from "@/app/svgComponent/FilterIcons";
import { GoHorizontalRule } from "react-icons/go";
import ThingsToEnjoy from "../../generic/ThingsToEnjoy";
import Banner from "../../generic/Banner";
import ProductListSection from "./components/ProductListSection";
import ItemLimit from "./components/ItemLimit";
import { fetchOrders } from "../../lib/fetchOrders";

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

  const result = await fetchOrders(page, limit);

  const data = result.data.products;
  const totalDoc = result?.data?.totalDoc;
  // console.log("real data:", data);

  return (
    <section className="flex flex-col h-full">
      <Banner title="Shop" links={links} />
      <div className="flex sm:flex-row gap-2 flex-col sm:items-center justify-around bg-[#F9F1E7] h-fit py-1 px-2">
        <div className="flex md:flex-row sm:flex-col flex-row gap-2 items-start justify-start sm:order-1 order-2 min-[375px]:text-base text-sm">
          <span className="flex  items-center">
            <FilterIcons />
            <span className="font-bold">Filter</span>
            {/* <PiDotsSixBold className="text-xl font-bold" /> */}
            {/* <BiviewList /> */}
            <GoHorizontalRule className="rotate-90" />
          </span>

          <p className="">
            Showing {page}–{page * limit} of {result?.data?.totalDoc || 0}{" "}
            results
          </p>
        </div>

        <ItemLimit />
      </div>

      {/* <Suspense fallback={<Loading />}> */}
      <ProductListSection data={data} itemsNumber={totalDoc} />
      {/* </Suspense> */}

      <ThingsToEnjoy />
    </section>
  );
}
