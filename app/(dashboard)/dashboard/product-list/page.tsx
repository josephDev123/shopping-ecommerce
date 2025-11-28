import ProductsListTable from "./components/ProductsListTable";
import FooterPagination from "../../commons/FooterPagination";
import { z } from "zod";
import { ProductFormDataSchema } from "../add-product/types/addProductDataTypes";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import FilterSection from "./components/FilterSection";
import ExportSection from "./components/ExportSection";
import { TransactionServerResponseType } from "@/app/types/TransactionType";
import { TransactionType } from "@/models/FlwTransactionModel";

interface pageProps {
  searchParams: {
    [key: string]: string | number | string[] | number[] | undefined;
  };
}

export default async function page({ searchParams }: pageProps) {
  // type productType = z.infer<typeof ProductFormDataSchema>;
  const session = await getServerSession(authOptions);

  console.log(searchParams);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/transaction?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 2
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch order data");
  }

  const data = await response.json();
  // const result: TransactionServerResponseType[] = data.data;
  const result: TransactionType[] = data.data;
  console.log(result);
  const totalDocs = data.data.totalCount;

  return (
    <section id="productPage" className="flex flex-col w-full h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">product List</h2>
          <p className="text-sm">
            {/* Manage your store's progress to increase your sales. */}
            Manage all the products you have bought.
          </p>
        </div>

        <ExportSection pageId="productPage" />
      </div>
      <hr className="border  border-gray-300 my-4" />
      <FilterSection />
      <div className="my-5 h-full">
        <div className="h-full">
          <Suspense key={Number(searchParams)} fallback={<p>Loading...</p>}>
            <ProductsListTable data={result} />
          </Suspense>
        </div>
      </div>

      <Suspense key={Number(searchParams)} fallback={<p>Loading...</p>}>
        <FooterPagination
          searchParam={Number(searchParams.page) || 1}
          itemToShow={Number(searchParams.limit) || 4}
          totalDocs={totalDocs}
        />
      </Suspense>
    </section>
  );
}
