import Banner from "../../generic/Banner";
import { CustomFetch } from "@/app/serverActions/customFetch";
import Container from "./components/container";
import { ProductDataType } from "@/app/types/productsType";
import { getCategoryToFilter } from "@/app/serverActions/getSearchCategory";
import { ICategoriesResponse } from "@/app/types/ICategory";

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

  const filterByCategory = await getCategoryToFilter();
  const CategoriesResponse: ICategoriesResponse = filterByCategory.data;
  const extractCategoryName =
    CategoriesResponse?.categoriesGroup?.map((cat) => cat._id) || [];

  return (
    <section className="flex flex-col h-full">
      <Banner title="Shop" links={links} />
      {/* <pre>{JSON.stringify(extractCategoryName, null, 2)}</pre> */}
      <Container
        data={data}
        limit={limit}
        page={page}
        totalDoc={totalDoc}
        categories={extractCategoryName}
      />
    </section>
  );
}
