import Navbar from "./components/Navbar";
import OrderPageMainWrapper from "./components/OrderPageMainWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { ClientOrderType } from "@/app/types/ClientOrderType";
import { CustomFetch } from "@/app/serverActions/customFetch";

export interface OrderPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: OrderPageProps) {
  const session = await getServerSession(authOptions);
  const searchQuery = await searchParams;
  const response = await CustomFetch({
    url: `${process.env.NEXT_PUBLIC_BASEURL}/api/orders/orders?user_id=${
      session?.user.id
    }&page=${Number(searchQuery.page) || 1}&limit=${
      Number(searchQuery.limit) || 10
    }`,
  });

  const result: ClientOrderType[] = response.data.orders;
  const totalDocs = response.data.totalOrders;

  // console.log(result);
  return (
    <section className="flex flex-col p-2 h-full">
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
      <h1 className="font-bold text-xl my-2">Orders</h1>
      <div>
        <Navbar searchParams={searchQuery} />
      </div>

      <div>
        <OrderPageMainWrapper data={result} totalRows={totalDocs} />
      </div>

      {/* <Suspense key={Number(searchParams)} fallback={<p>Loading...</p>}>
        <FooterPagination
          searchParam={Number(searchParams.page) || 1}
          itemToShow={Number(searchParams.limit) || 4}
          totalDocs={totalDocs}
        />
      </Suspense> */}
    </section>
  );
}
