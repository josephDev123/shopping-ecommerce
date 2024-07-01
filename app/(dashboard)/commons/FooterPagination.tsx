import Button from "@/app/(client)/generic/Button";
import { SelectInput } from "@/app/(client)/generic/Input";
import React from "react";
import { MdOutlineExpandLess } from "react-icons/md";
import { useRouter } from "next/navigation";

interface FooterPaginationProps<T> {
  pages: any[] | null;
  searchParam: string;
  setLimit: (value: string) => void;
}

export default function FooterPagination<T>({
  searchParam,
  pages,
  setLimit,
}: FooterPaginationProps<T>) {
  const navigate = useRouter();
  const itemPerPage = 3;
  const pagesNumber = Math.ceil(Number(pages?.length) / itemPerPage);
  console.log(pagesNumber);

  const limit = [3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex justify-between items-center w-full h-fit mt-auto">
      <div className="flex gap-2 items-center w-full ">
        Showing
        <div>
          <SelectInput
            onChange={(e) => setLimit(e.target.value)}
            name=""
            placeholder="10"
            data={limit}
            labelName=""
            className="border rounded-md w-12"
          />
        </div>
        <span className="inline-flex items-center justify-center">
          of {pages?.length}
        </span>
      </div>

      <div className="flex gap-1">
        <Button
          type="button"
          disabled={
            searchParam === "0"
              ? true
              : searchParam === undefined
              ? true
              : false
          }
          onClick={() => navigate.push(`product-list?page=${pagesNumber - 1}`)}
          textContent=""
          className={`flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6 ${
            searchParam === "0"
              ? "cursor-not-allowed"
              : searchParam === undefined
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <MdOutlineExpandLess className="-rotate-90" />
        </Button>

        {Array.from({ length: pagesNumber }, (page, i) => (
          <Button
            key={i}
            onClick={() => navigate.push(`product-list?page=${i + 1}`)}
            textContent=""
            className="flex justify-center items-center p-1 rounded-md bg-blue-800 text-white w-8 h-6"
          >
            {i + 1}
          </Button>
        ))}

        <Button
          disabled={searchParam === String(pagesNumber) ? true : false}
          onClick={() => {
            navigate.push(
              `product-list?page=${
                searchParam === undefined ? 0 + 1 : searchParam
              }`
            );
          }}
          textContent=""
          className={`flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6  ${
            searchParam === String(pagesNumber)
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <MdOutlineExpandLess className="rotate-90" />
        </Button>
      </div>
    </div>
  );
}
