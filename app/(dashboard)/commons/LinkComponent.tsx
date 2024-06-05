"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LinkComponentType {
  href: string;
  children: ReactNode;
}
const LinkComponent = ({ href, children }: LinkComponentType) => {
  const router = usePathname();
  const isActive = router === href;

  return (
    <Link className={`${isActive ? "border border-blue-500" : ""}`} href={href}>
      {children}
    </Link>
  );
};

// Export the component
export default LinkComponent;
