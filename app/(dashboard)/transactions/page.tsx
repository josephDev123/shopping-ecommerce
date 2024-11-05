import { getServerSession } from "next-auth";
import FooterPagination from "../commons/FooterPagination";
import TransactionTable from "./components/TransactionTable";
import { authOptions } from "@/lib/NextAuthOption";
import { TransactionServerResponseType } from "@/app/types/TransactionSeverResponseType";

export default async function page() {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/transaction?user_id=${session?.user.id}&page=1&limit=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const result: TransactionServerResponseType[] = data.data;
  // console.log(result);
  return (
    <section className="flex flex-col w-full h-full p-3">
      {/* {JSON.stringify(result)} */}
      <h2 className="text-2xl font-bold">Transaction</h2>
      <TransactionTable data={result} />
      <footer className="mt-auto ms-auto">
        <button
          type="button"
          className="border border-green-400 rounded-md py-0.5 px-2 font-semibold text-green-400 hover:bg-green-100 hover:text-green-500"
        >
          Next
        </button>
      </footer>
      {/* <FooterPagination /> */}
    </section>
  );
}
