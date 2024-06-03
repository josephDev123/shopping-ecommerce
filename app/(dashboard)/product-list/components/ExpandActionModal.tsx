import Link from "next/link";
import { TiEyeOutline } from "react-icons/ti";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";

export default function ExpandActionModal() {
  return (
    <section className="flex flex-col drop-shadow-md border bg-white p-2 rounded-md space-y-3">
      <Link
        href={"/view-product"}
        className="flex items-center gap-3 font-medium"
      >
        <TiEyeOutline />
        View
      </Link>

      <Link
        href={"/edit-product"}
        className="flex items-center gap-3 font-medium"
      >
        <RiEdit2Line />
        Edit
      </Link>

      <Link
        href={""}
        className="flex items-center gap-3 text-red-400 font-medium"
      >
        <RiDeleteBinLine className="" />
        Delete
      </Link>
    </section>
  );
}
