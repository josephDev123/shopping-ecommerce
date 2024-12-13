"use client";

import Link from "next/link";
import { LiaGreaterThanSolid } from "react-icons/lia";
// import { ILink } from "../(page)/page";
import { usePathname } from "next/navigation";

interface IActiveInLineLink {
  items: {
    name: string;
    url: string;
  }[];
}

export default function ActiveInLineLink({ items }: IActiveInLineLink) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <ul className="flex items-center justify-center gap-1">
      {items.map((item, i) => (
        <span key={i}>
          <li className={`${pathname === item.url ? "" : "font-bold"}`}>
            <Link href={item.url}>{item.name}</Link>
          </li>
          <LiaGreaterThanSolid className="last:hidden  text-sm" />
        </span>
      ))}
    </ul>
  );
}
