import React from "react";
import LeftPanelItemCard from "./LeftPanelItemCard";
import { leftPanelItem } from "../dashboard/data/leftPanelData";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { Images } from "@/app/Images";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbBrandProducthunt } from "react-icons/tb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";

export default async function LeftPanel() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-full flex flex-col justify-between items-center">
      <Link href="/" className="text-2xl font-semibold my-4">
        JoeBank
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
              path="/add-product"
            />
          </>
        )}

        <LeftPanelItemCard
          icon={<TbBrandProducthunt className="text-lg" />}
          text="Product List"
          path="/product-list"
        />
      </div>
      <div className="mt-auto flex flex-col space-y-8 w-full">
        <LeftPanelItemCard
          icon={<BiLogOut className="" />}
          text="Logout"
          path="login"
          className="bg-gray-600/30"
        />

        <div className="flex gap-3 items-center justify-center">
          <img
            src={Images.avatar}
            width={25}
            height={25}
            loading="lazy"
            className="bg-white/25 rounded-full"
          />
          <div className="flex flex-col mb-2">
            <h2 className="text-sm truncate">{session?.user.name}</h2>
            <Link href={""} className="text-xs">
              View profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
