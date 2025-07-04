import React, { Suspense } from "react";
import CategoryMainSection from "./components/CategoryMainWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { CategoryType } from "@/app/types/categoryType";
import { CustomFetch } from "@/app/serverActions/customFetch";

export interface OrderPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: OrderPageProps) {
  const session = await getServerSession(authOptions);

  const response = await CustomFetch({
    url: `${process.env.NEXT_PUBLIC_BASEURL}/api/categories/category?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 4
    }`,
  });

  const result: CategoryType[] = response.data.categoryPurchased;
  const totalCategories = response.data.totalPurchaseCategoryCount;
  console.log(response);
  return (
    <section className="flex flex-col p-2 h-full">
      {/* {JSON.stringify(session)} */}
      <h1 className="font-bold text-xl ">Category </h1>

      <Suspense fallback={<p>Loading...</p>}>
        <CategoryMainSection data={result} totalRows={totalCategories} />
      </Suspense>
    </section>
  );
}
