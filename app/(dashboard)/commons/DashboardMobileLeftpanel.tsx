"use client";

import react, { useRef } from "react";
import { BiLogOut } from "react-icons/bi";
import LeftPanelItemCard from "./LeftPanelItemCard";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { leftPanelItem } from "../dashboard/data/leftPanelData";
import { Images } from "@/app/Images";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
// import { motion } from "framer-motion";
import {
  useAppDispatch,
  useAppSelector,
  useAppStore,
} from "@/lib/slices/hooks";
import { toggleLeftPanel } from "@/lib/slices/leftpanelSlice";

export default function DashboardMobileLeftpanel() {
  const state = useAppSelector((state) => state.leftPanelState);
  const dispatch = useAppDispatch();
  // const store = useAppStore();
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   store.dispatch(toggleLeftPanel());
  //   initialized.current = true;
  // }

  return (
    <>
      {state.value && (
        <section
          // animate={""}
          className="fixed inset-0 z-20 md:hidden flex flex-col w-full h-full bg-red-400"
        >
          <div className="w-full min-[425px]:w-[50%] h-full flex flex-col pl-6 pr-2 bg-darkBlack overflow-y-auto text-white ">
            <IoIosClose
              onClick={() => dispatch(toggleLeftPanel())}
              className="self-end text-3xl mt-2 hover:bg-gray-200 rounded-full p-1"
            />
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
              <h2 className="text-sm">PRODUCTS</h2>
              <LeftPanelItemCard
                icon={<IoIosAddCircleOutline className="text-lg" />}
                text="Add Products"
                path="/add-product"
              />

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
                className="bg-gray-600/30 w-fit"
              />

              <div className="flex gap-3 relative">
                {/* <Image
                  alt="avatar"
                  src={Images.avatar}
                  width={35}
                  height={35}
                  // fill
                  loading="lazy"
                  className="bg-white/25 rounded-full"
                /> */}
                <div className="flex flex-col ">
                  <h2 className="text-sm">Joseph Uzuegbu</h2>
                  <Link href={""} className="text-xs">
                    View profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
