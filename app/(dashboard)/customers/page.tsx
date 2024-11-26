import { getServerSession } from "next-auth";
import FooterPagination from "../commons/FooterPagination";
import CustomerTable from "./components/CustomerTable";
import { authOptions } from "@/lib/NextAuthOption";
import { ClientOrderType } from "@/app/types/ClientOrderType";

export interface CustomerPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: CustomerPageProps) {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/customer?user_id=${
      session?.user.id
    }&page=${searchParams.page ?? 1}&limit=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const result: ClientOrderType[] = data.data.customers;
  const totalCustomers = data.data.totalCustomer;
  // console.log(data);
  return (
    <section className="flex flex-col w-full h-full p-3">
      {/* {JSON.stringify(data)} */}
      <h2 className="text-2xl font-bold">Customer</h2>
      <CustomerTable data={result} />
      {/* <footer className="mt-auto ms-auto">
        <button
          type="button"
          className="border border-green-400 rounded-md py-0.5 px-2 font-semibold text-green-400 hover:bg-green-100 hover:text-green-500"
        >
          Next
        </button>
      </footer> */}
      <FooterPagination
        itemToShow={Number(searchParams.limit) || 4}
        totalDocs={totalCustomers}
        searchParam={Number(searchParams.page) || 1}
      />
    </section>
  );
}
