import { Suspense } from "react";
import Banner from "../generic/Banner";
import CategoryItem from "./component/CategoryItem";
import Loader from "../components/Loader";
import MainCategory from "./component/MainCategory";
import CategoryBodyWrapper from "./component/CategoryBodyWrapper";
import { CustomFetch } from "@/app/serverActions/customFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const links = [
    { name: "Home", url: "/" },
    { name: "Category", url: "/category" },
  ];

  const productCategories = await CustomFetch({
    url: `${process.env.NEXT_PUBLIC_BASEURL}/api/category?page=${1}&limit=${6}`,
  });

  const result = productCategories.data.categoriesGroup;
  const totalResult = productCategories.totalCategories;

  return (
    <section className="flex flex-col w-full h-full ">
      <Banner title="Category" links={links} />
      {/* <Suspense
        fallback={
          <Loader className="h-56 flex flex-col items-center justify-center" />
        }
      > */}
      <CategoryBodyWrapper categories={result} />
      {/* </Suspense> */}
    </section>
  );
}
