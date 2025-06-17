import FilterIcons from "@/app/svgComponent/FilterIcons";
import { GoHorizontalRule } from "react-icons/go";
import ThingsToEnjoy from "../../generic/ThingsToEnjoy";
import Banner from "../../generic/Banner";
import ProductListSection from "./components/ProductListSection";
import ItemLimit from "./components/ItemLimit";
import { CustomFetch } from "@/app/serverActions/customFetch";
import ShopFilter from "./components/ShopFilter";
import Container from "./components/container";
import { ProductDataType } from "@/app/types/productsType";

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

  const data: ProductDataType[] = result.data.products;
  const totalDoc = result?.data?.totalDoc as number;
  console.log("real data:", data);

  return (
    <section className="flex flex-col h-full">
      <Banner title="Shop" links={links} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Container data={data} limit={limit} page={page} totalDoc={totalDoc} />
    </section>
  );
}
