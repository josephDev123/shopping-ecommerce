import FailedOrder from "./components/FailedOrder";
import SuccessOrder from "./components/SuccessOrder";

export default async function page({
  searchParams,
}: {
  searchParams: { status: string; tx_ref: string; transaction_id: string };
}) {
  return (
    <section className="flex flex-col h-full w-full">
      {searchParams.status === "failed" && <FailedOrder />}
      {searchParams.status === "successful" && <SuccessOrder />}
    </section>
  );
}
