import React from "react";
import LeftPanelItemCard from "./LeftPanelItemCard";
import { leftPanelItem } from "../dashboard/data/leftPanelData";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import Logout from "./Logout";
import Image from "next/image";
import EmptyAvatar from "./EmptyAvatar";

export default async function LeftPanel() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-full flex flex-col justify-between items-center">
      <Link
        href="/dashboard"
        className="text-2xl font-semibold my-4 inline-flex items-center gap-2  w-full"
      >
        <div className="relative size-12">
          <Image src="/png/logo.png" alt="logo" fill objectFit="contain" />
        </div>

        <span>Shop</span>
      </Link>
      <div className="space-y-4">
        {leftPanelItem.map((item, id) => (
          <LeftPanelItemCard
            key={id}
            icon={item.icons}
            text={item.text}
            path={item.path}
          />
        ))}
      </div>
      <div className="flex flex-col w-full mt-4">
        {session?.user.role === "admin" && (
          <>
            <h2 className="text-sm">PRODUCTS</h2>
            <LeftPanelItemCard
              icon={<IoIosAddCircleOutline className="text-lg" />}
              text="Add Products"
              path="/dashboard/add-product"
            />
          </>
        )}

        {/* <LeftPanelItemCard
          icon={<TbBrandProducthunt className="text-lg" />}
          text="Product List"
          path="/product-list"
        /> */}
      </div>

      <div className="mt-auto flex flex-col space-y-8 w-full">
        <Logout />

        <div className="flex gap-3 items-center justify-center">
          <EmptyAvatar name={session?.user.name!} />
          {/* <img
            src={Images.avatar}
            width={25}
            height={25}
            loading="lazy"
            className="bg-white/25 rounded-full"
          /> */}
          <div className="flex flex-col mb-2">
            <h2 className="text-sm truncate">{session?.user.name}</h2>
            <Link
              aria-disabled={true}
              href={"/dashboard/profile"}
              className="text-xs text-green-500"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
