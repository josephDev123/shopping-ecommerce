import { getServerSession } from "next-auth";
import FooterPagination from "../../commons/FooterPagination";
import CustomerTable from "./components/CustomerTable";
import { authOptions } from "@/lib/NextAuthOption";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { Suspense } from "react";
import { CustomFetch } from "@/app/serverActions/customFetch";

export interface CustomerPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: CustomerPageProps) {
  const session = await getServerSession(authOptions);
  const urlQuery = await searchParams;
  const response = await CustomFetch({
    url: `${process.env.NEXT_PUBLIC_BASEURL}/api/customer?user_id=${
      session?.user.id
    }&page=${urlQuery.page ?? 1}&limit=5`,
  });

  const result: ClientOrderType[] = response.data.customers;
  const totalCustomers = response.data.totalCustomer;

  return (
    <section className="flex flex-col w-full h-full p-3">
      {/* {JSON.stringify(data)} */}
      <h2 className="text-2xl font-bold">Customer</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <CustomerTable data={result} totalRow={totalCustomers} />
      </Suspense>
    </section>
  );
}
