import { links } from "@/app/types/bannerLinks";
import React from "react";
import ActiveInLineLink from "../shop/component/ActiveInLineLink";
import bannerImage from "../shop/style/shop.module.css";

interface IBanner {
  title: string;
  links: links[];
  bgImg?: string;
}

export default function Banner({ title, links, bgImg }: IBanner) {
  return (
    <section
      className={`h-[320px] w-full  flex flex-col justify-center items-center ${bannerImage.bg}`}
    >
      <h1 className="text-3xl font-bold mb-1">{title}</h1>
      <ActiveInLineLink items={links} />
    </section>
  );
}
