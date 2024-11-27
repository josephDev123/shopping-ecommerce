"use client";

import { useAppDispatch } from "@/lib/slices/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toggleLeftPanel } from "@/lib/slices/leftpanelSlice";

type LeftPanelItemCardType = {
  icon: React.ReactNode;
  text: string;
  path: string;
  className?: string;
};
export default function LeftPanelItemCard({
  icon,
  text,
  path,
  className,
}: LeftPanelItemCardType) {
  const activeRoute = usePathname();
  const navigate = useRouter();
  return (
    <Link
      // onClick={}
      href={path}
      className={`${
        activeRoute === path && "bg-green"
      } flex items-center gap-2  p-2 rounded-md hover:bg-gray-950 ${className}`}
    >
      {icon} {text}
    </Link>
  );
}

type LeftMobilePanelItemCardType = {
  icon: React.ReactNode;
  text: string;
  path: string;
  className?: string;
};
export function LeftMobilePanelItemCard({
  icon,
  text,
  path,
  className,
}: LeftPanelItemCardType) {
  const activeRoute = usePathname();
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  return (
    <button
      disabled={path === "/coupon"}
      onClick={() => {
        navigate.push(path);
        dispatch(toggleLeftPanel());
      }}
      // href={path}
      className={`${
        activeRoute === path && "bg-green"
      } flex items-center gap-2  p-2 rounded-md hover:bg-gray-950 ${className}`}
    >
      {icon} {text}
    </button>
  );
}
