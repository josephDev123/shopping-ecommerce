import { getServerSession } from "next-auth";
import FooterPagination from "../../commons/FooterPagination";
import TransactionTable from "./components/TransactionTable";
import { authOptions } from "@/lib/NextAuthOption";
import { TransactionServerResponseType } from "@/app/types/TransactionSeverResponseType";
import { Suspense } from "react";
import { TransactionType } from "@/models/FlwTransactionModel";
export interface TransactionPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function page({ searchParams }: TransactionPageProps) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/transaction?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 2
    }`
  );
  if (!response.ok) {
    return (
      <div className="flex flex-col h-40 justify-center items-center text-red-300">
        Failed to fetch transaction data
      </div>
    );
  }

  const data = await response.json();

  const result: TransactionType[] = data.data.transactionData;
  const totalTransactionCount = data.data.totalCount;
  // console.log(result);
  return (
    <section className="flex flex-col w-full h-full p-3">
      {/* {JSON.stringify(result)} */}
      <h2 className="text-2xl font-bold">Transaction</h2>
      <Suspense key={Number(searchParams.page)} fallback={<p>Loading...</p>}>
        <TransactionTable data={result} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <FooterPagination
          itemToShow={Number(searchParams.limit) || 2}
          totalDocs={totalTransactionCount}
          searchParam={Number(searchParams.page) || 1}
        />
      </Suspense>
    </section>
  );
}
