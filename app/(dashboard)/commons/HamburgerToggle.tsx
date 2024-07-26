"use client";

import { toggleLeftPanel } from "@/lib/slices/leftpanelSlice";
import React, { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch, useAppStore } from "@/lib/slices/hooks";

export default function HamburgerToggle() {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(toggleLeftPanel());
    initialized.current = true;
  }
  return (
    <RxHamburgerMenu
      onClick={() => dispatch(toggleLeftPanel())}
      // onClick={() => alert("hello")}
      className="text-3xl hover:bg-gray-200 rounded-full p-1 cursor-pointer"
    />
  );
}
