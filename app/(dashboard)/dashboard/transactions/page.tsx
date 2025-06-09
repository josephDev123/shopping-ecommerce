import { getServerSession } from "next-auth";
import FooterPagination from "../../commons/FooterPagination";
import TransactionTable from "./components/TransactionTable";
import { authOptions } from "@/lib/NextAuthOption";
import { CustomFetch } from "@/app/serverActions/customFetch";
import { ITransactionDTO } from "@/app/api/DTO/transactionDTO";
export interface TransactionPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function page({ searchParams }: TransactionPageProps) {
  const session = await getServerSession(authOptions);
  const response = await CustomFetch({
    url: `${process.env.SERVER_BASEURL}/api/transaction?user_id=${
      session?.user.id
    }&page=${Number(searchParams.page) || 1}&limit=${
      Number(searchParams.limit) || 10
    }`,
  });

  const result: ITransactionDTO[] = response.data.transactionData || [];
  const totalTransactionCount = response.data.totalCount;
  // console.log(result);
  return (
    <section className="flex flex-col w-full h-full p-3">
      <h2 className="text-2xl font-bold">Transaction</h2>

      <TransactionTable data={result} rowCount={totalTransactionCount} />
    </section>
  );
}
