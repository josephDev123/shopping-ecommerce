import React from "react";

export default function EmptyAvatar({ name }: { name: string }) {
  const abbr = name
    .split(" ")
    .filter((item) => item.length > 0)
    .map((item) => `${item[0]}`);
  const abbrResult = abbr.join("") ?? "none";
  //   console.log("abbr", abbr);
  return (
    <div className="flex flex-col justify-center items-center p-1 rounded-full size-10 font-semibold bg-gray-300 text-gray-800">
      {abbrResult}
    </div>
  );
}
