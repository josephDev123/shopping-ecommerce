import { Suspense } from "react";
import { getShip } from "./actions/getShip";
import ShippingTable from "./components/ShippingTable";
import { Shipping } from "./type/ApiShipping";

export const dynamic = "force-dynamic";

export default async function page() {
  const result = await getShip();
  const shipping = result.data.shippings as Shipping[];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      {/* {JSON.stringify(shipping, null, 2)} */}
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Shipping</h1>
        <p className="text-gray-600 text-sm">
          This page manages the shipping process, including updating shipment
          details, tracking orders, assigning delivery methods, and ensuring
          each order is processed and dispatched accurately.
        </p>
      </section>
      <Suspense fallback="Loading ...">
        <ShippingTable data={shipping} />
      </Suspense>
    </div>
  );
}
