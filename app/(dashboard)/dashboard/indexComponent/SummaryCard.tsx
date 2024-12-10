"use client";

import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  figure: string | number;
  description: string;
  children: ReactNode;
}
export default function SummaryCard({
  figure,
  title,
  description,
  children,
}: SummaryCardProps) {
  return (
    <section className="bg-black text-white rounded-md flex justify-between items-center p-3 border">
      <div className="flex flex-col ">
        <h1 className="font-medium text-white/70">{title}</h1>
        <h1 className="text-xl font-bold">{figure}</h1>
        <p className="text-xs text-white/70">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}
