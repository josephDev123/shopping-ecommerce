import { getShip } from "./actions/getShip";

export const dynamic = "force-dynamic";

export default async function page() {
  const shipping = await getShip();

  return (
    <div className="w-full h-56 flex flex-col justify-center items-center">
      Shipping page coming soon...
    </div>
  );
}
