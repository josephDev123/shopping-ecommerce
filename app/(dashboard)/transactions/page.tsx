import { getServerSession } from "next-auth";
import FooterPagination from "../commons/FooterPagination";
import TransactionTable from "./components/TransactionTable";
import { authOptions } from "@/lib/NextAuthOption";
import { TransactionServerResponseType } from "@/app/types/TransactionSeverResponseType";
import { Suspense } from "react";
export interface TransactionPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function page({ searchParams }: TransactionPageProps) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/transaction?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 4
    }`
  );
  if (!response.ok) {
    return "Failed to fetch transaction data";
  }

  const data = await response.json();

  const result: TransactionServerResponseType[] = data.data.transactionData;
  const totalTransactionCount = data.data.totalCount;
  // console.log(result);
  return (
    <section className="flex flex-col w-full h-full p-3">
      {/* {JSON.stringify(result)} */}
      <h2 className="text-2xl font-bold">Transaction</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <TransactionTable data={result} />
      </Suspense>

      {/* <footer className="mt-auto ms-auto">
        <button
          type="button"
          className="border border-green-400 rounded-md py-0.5 px-2 font-semibold text-green-400 hover:bg-green-100 hover:text-green-500"
        >
          Next
        </button>
      </footer> */}
      <Suspense fallback={<p>Loading...</p>}>
        <FooterPagination
          itemToShow={Number(searchParams.limit) || 4}
          totalDocs={totalTransactionCount}
          searchParam={Number(searchParams.page) || 1}
        />
      </Suspense>
    </section>
  );
}
