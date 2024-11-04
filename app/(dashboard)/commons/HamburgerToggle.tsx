"use client";

import { toggleLeftPanel } from "@/lib/slices/leftpanelSlice";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch } from "@/lib/slices/hooks";

export default function HamburgerToggle() {
  const dispatch = useAppDispatch();

  return (
    <RxHamburgerMenu
      onClick={() => dispatch(toggleLeftPanel())}
      className="text-3xl md:hidden  hover:bg-gray-200 rounded-full p-1 cursor-pointer"
    />
  );
}
