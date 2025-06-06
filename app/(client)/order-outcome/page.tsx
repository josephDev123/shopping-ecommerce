// import FailedOrder from "./components/FailedOrder";
// import SuccessOrder from "./components/SuccessOrder";
// import { CustomFetch } from "@/app/serverActions/customFetch";

// export default async function page({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   // const [data, setData] = useState<transactionOutcomeType>(null!);
//   // const [status, setStatus] = useState<"idle" | "loading" | "data" | "error">(
//   //   "idle"
//   // );

//   // const memoOrderData = useCallback(
//   //   async function OrderData() {
//   //     setStatus("loading");
//   //     try {
//   //       const response = await fetch(
//   //         `${process.env.NEXT_PUBLIC_BASEURL}/api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id=${searchParams.transaction_id}`
//   //       );

//   //       if (!response.ok) throw new Error("API request failed");

//   //       const result = await response.json();
//   //       setData(result.data);

//   //       setStatus("data");
//   //     } catch (error) {
//   //       console.error("Error fetching order data:", error);
//   //       setStatus("error");
//   //     }
//   //   },
//   //   [searchParams.status, searchParams.tx_ref, searchParams.transaction_id]
//   // );

//   // useEffect(() => {
//   //   memoOrderData();
//   // }, [memoOrderData]);

//   // const response = await fetch(
//   //   `${process.env.NEXT_PUBLIC_BASEURL}/api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id= ${searchParams.transaction_id}`
//   // );
//   // if (!response.ok) {
//   //   return (
//   //     <div className="h-42 flex flex-col justify-center items-center">
//   //       error occurs
//   //     </div>
//   //   );
//   // }
//   // const result = await response.json();

//   const response = await CustomFetch({
//     url: `${process.env.NEXT_PUBLIC_BASEURL}/api/verify-order?status=${searchParams.status}&tx_ref=${searchParams.tx_ref}&transaction_id=${searchParams.transaction_id}`,
//   });
//   const result = response;
//   return (
//     <section className="flex flex-col h-full w-full">
//       {/* <pre className="font-mono">{JSON.stringify(searchParams, null, 2)}</pre>
//       <pre className="font-mono">{JSON.stringify(result, null, 2)}</pre> */}

//       {searchParams.status === "cancelled" && <FailedOrder />}
//       {searchParams.status === "successful" && (
//         <SuccessOrder successTransaction={result} />
//       )}
//     </section>
//   );
// }

import FailedOrder from "./components/FailedOrder";
import SuccessOrder from "./components/SuccessOrder";
import { CustomFetch } from "@/app/serverActions/customFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const status =
    typeof searchParams.status === "string" ? searchParams.status : "";
  const tx_ref =
    typeof searchParams.tx_ref === "string" ? searchParams.tx_ref : "";
  const transaction_id =
    typeof searchParams.transaction_id === "string"
      ? searchParams.transaction_id
      : "";

  // Guard against missing required query params
  if (!status || !tx_ref || !transaction_id) {
    return (
      <div className="h-42 flex flex-col justify-center items-center text-red-500">
        Invalid or missing transaction parameters.
      </div>
    );
  }

  const response = await CustomFetch({
    url: `${process.env.SERVER_BASEURL}/api/verify-order?status=${status}&tx_ref=${tx_ref}&transaction_id=${transaction_id}`,
  });

  return (
    <section className="flex flex-col h-full w-full">
      {status === "cancelled" && <FailedOrder />}
      {status === "successful" && (
        <SuccessOrder successTransaction={response} />
      )}
    </section>
  );
}
