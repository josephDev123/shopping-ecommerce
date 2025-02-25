import { getServerSession } from "next-auth";
import FooterPagination from "../commons/FooterPagination";
import CustomerTable from "./components/CustomerTable";
import { authOptions } from "@/lib/NextAuthOption";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { Suspense } from "react";

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
    return "Failed to fetch Customer's data";
  }

  const data = await response.json();
  const result: ClientOrderType[] = data.data.customers;
  const totalCustomers = data.data.totalCustomer;
  // console.log(data);
  return (
    <section className="flex flex-col w-full h-full p-3">
      {/* {JSON.stringify(data)} */}
      <h2 className="text-2xl font-bold">Customer</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <CustomerTable data={result} />
      </Suspense>

      <Suspense fallback={<p className="mt-auto">Loading...</p>}>
        <FooterPagination
          itemToShow={Number(searchParams.limit) || 4}
          totalDocs={totalCustomers}
          searchParam={Number(searchParams.page) || 1}
        />
      </Suspense>
    </section>
  );
}
