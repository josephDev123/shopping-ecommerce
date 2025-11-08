import PaymentFailedPage from "./components/FailedOrder";
import InvalidTransactionNotice from "./components/InvalidKeyTransaction";
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

  console.log(status, tx_ref, transaction_id);

  // Guard against missing required query params
  if (!status || !tx_ref || !transaction_id) {
    return (
      <div className=" p-6 flex flex-col justify-center items-center ">
        <InvalidTransactionNotice />
      </div>
    );
  }

  const response = await CustomFetch({
    url: `${process.env.SERVER_BASEURL}/api/verify-order?status=${status}&tx_ref=${tx_ref}&transaction_id=${transaction_id}`,
  });

  return (
    <section className="flex flex-col h-full w-full">
      {status === "cancelled" && <PaymentFailedPage />}
      {status === "successful" && (
        <SuccessOrder successTransaction={response} />
      )}
    </section>
  );
}
