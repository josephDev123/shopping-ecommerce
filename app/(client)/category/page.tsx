import { Suspense } from "react";
import Banner from "../generic/Banner";
import CategoryItem from "./component/CategoryItem";
import Loader from "../components/Loader";
import MainCategory from "./component/MainCategory";
import CategoryBodyWrapper from "./component/CategoryBodyWrapper";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const links = [
    { name: "Home", url: "/" },
    { name: "Category", url: "/category" },
  ];

  // console.log(searchParams);
  const productCategories = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/category?&page=${1}&limit=${2}`
  );
  if (!productCategories.ok) {
    return (
      <div className="flex flex-col h-56 justify-center items-center text-red-400">
        Error fetching category data
      </div>
    );
  }

  const formatResponse = await productCategories.json();
  const result = formatResponse.data.categoriesGroup;
  const totalResult = formatResponse.totalCategories;
  // console.log(result);

  return (
    <section className="flex flex-col w-full h-full ">
      <Banner title="Contact" links={links} />
      <Suspense
        fallback={
          <Loader className="h-56 flex flex-col items-center justify-center" />
        }
      >
        {/* <pre>{JSON.stringify(result)}</pre> */}
        <CategoryBodyWrapper categories={result} />
      </Suspense>
    </section>
  );
}
