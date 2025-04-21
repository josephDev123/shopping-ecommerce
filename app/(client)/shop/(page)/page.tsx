import FilterIcons from "@/app/svgComponent/FilterIcons";
import { GoHorizontalRule } from "react-icons/go";
import ThingsToEnjoy from "../../generic/ThingsToEnjoy";
import Banner from "../../generic/Banner";
import ProductListSection from "./components/ProductListSection";
import ItemLimit from "./components/ItemLimit";
import { CustomFetch } from "@/app/serverActions/customFetch";
import ShopFilter from "./components/ShopFilter";

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
  const limit = Number(searchParams.limit) || 10;

  const result = await CustomFetch({
    url: `${process.env.NEXT_PUBLIC_BASEURL}/api/product/products-paginate?page=${page}&limit=${limit}`,
  });

  const data = result.data.products;
  const totalDoc = result?.data?.totalDoc;
  // console.log("real data:", data);

  return (
    <section className="flex flex-col h-full">
      <Banner title="Shop" links={links} />
      <div className="flex sm:flex-row gap-2 flex-col sm:items-center justify-around bg-[#F9F1E7] h-fit py-1 px-2">
        <div className="flex md:flex-row sm:flex-col flex-row gap-2 items-start justify-start sm:order-1 order-2 min-[375px]:text-base text-sm">
          <ShopFilter />

          <p className="">
            Showing {page}–{page * limit} of {result?.data?.totalDoc || 0}{" "}
            results
          </p>
        </div>

        <ItemLimit />
      </div>

      {/* <Suspense fallback={<Loading />}> */}
      <ProductListSection data={data} itemsNumber={totalDoc} limit={limit} />
      {/* </Suspense> */}

      <ThingsToEnjoy />
    </section>
  );
}
