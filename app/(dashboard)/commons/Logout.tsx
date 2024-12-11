"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
  return (
    <button
      type="button"
      onClick={() => signOut({ redirect: true })}
      className={`flex items-center gap-2  p-2 rounded-md hover:bg-gray-950`}
    >
      <BiLogOut className="" />
      Logout
    </button>
  );
}
