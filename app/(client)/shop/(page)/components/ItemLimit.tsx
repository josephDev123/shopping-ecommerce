"use client";

import { useRouter } from "next/navigation";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface ItemLimitProps {
  limit: number;
}
export default function ItemLimit() {
  const navigate = useRouter();
  return (
    <div className="flex items-center gap-6 sm:order-2 order-1">
      <div className="flex items-center gap-4">
        <AiOutlineExclamationCircle
          className=" text-lg cursor-pointer"
          title="min of 4 and max of 8 item to display"
        />
        <b className="min-[375px]:text-sm">Show</b>
        <input
          type="number"
          placeholder="4"
          min={4}
          maxLength={1}
          name=""
          id=""
          onInput={(e) => {
            const value = e.currentTarget.value;
            if (+value < 4 || +value > 8) {
              e.currentTarget.value = value.slice(0, -1); // Remove the last character
              return;
            }
            navigate.push(`/shop?limit=${value}`);
          }}
          // value={""}
          className="min-[375px]:w-16 min-[375px]:h-10 w-12 h-6 rounded-md outline-none px-1"
        />
      </div>

      {/* <div className="flex items-center gap-4">
      <b className="min-[375px]:text-sm">Sort by</b>
      <input
        type="search"
        placeholder="Default"
        name=""
        id=""
        className="min-[375px]:w-28 min-[375px]:h-10 w-24 h-7 rounded-md outline-none px-1"
      />
    </div> */}
    </div>
  );
}
