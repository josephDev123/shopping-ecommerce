"use client";

import Button from "@/app/(client)/generic/Button";
import { SelectInput } from "@/app/(client)/generic/Input";
import React from "react";
import { MdOutlineExpandLess } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FooterPaginationProps<T> {
  // pages: any[] | null;
  searchParam: number;
  itemToShow: number;
  totalDocs: number;
}

export default function FooterPagination<T>({
  searchParam,
  itemToShow,
  totalDocs,
}: FooterPaginationProps<T>) {
  const navigate = useRouter();
  const itemPerPage = 3;
  const pagesNumber = Math.ceil(Number(totalDocs) / itemPerPage);
  console.log(pagesNumber, searchParam);

  const limit = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex justify-between items-center w-full h-fit mt-auto">
      <div className="flex gap-2 items-center w-full ">
        Showing
        <div>
          <SelectInput
            // onChange={(e) => setLimit(e.target.value)}
            onChange={(e) =>
              navigate.push(`?page=${searchParam}&limit=${e.target.value}`)
            }
            name=""
            min={3}
            max={10}
            // placeholder="3"
            value={itemToShow}
            data={limit}
            labelName=""
            className="border rounded-md w-12"
          />
        </div>
        <span className="inline-flex items-center justify-center">
          of {totalDocs}
        </span>
      </div>

      <div className="flex gap-1">
        {/* <Link href={`?page=${pagesNumber - 1}`}> */}
        <Button
          type="button"
          disabled={searchParam === 1 ? true : false}
          onClick={() => navigate.push(`?page=${searchParam - 1}`)}
          textContent=""
          className={`flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6 ${
            searchParam === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <MdOutlineExpandLess className="-rotate-90" />
        </Button>
        {/* </Link> */}
        {Array.from({ length: pagesNumber }, (page, i) => (
          <Link href={`?page=${i + 1}`}>
            <Button
              key={i}
              // onClick={() => navigate.push(`product-list?page=${i + 1}`)}
              textContent=""
              className="flex justify-center items-center p-1 rounded-md bg-blue-800 text-white w-8 h-6"
            >
              {i + 1}
            </Button>
          </Link>
        ))}

        <Button
          disabled={searchParam === pagesNumber ? true : false}
          onClick={() => {
            if (searchParam !== pagesNumber) {
              navigate.push(`?page=${Number(searchParam) + 1}`);
            }
          }}
          textContent=""
          className={`flex justify-center items-center p-1 rounded-md bg-gray-300 w-8 h-6  ${
            searchParam === pagesNumber
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {/* <Link
            href={`?page=${
              Number(searchParam) !== Number(pagesNumber) && 0 + 1
            }`}
          > */}
          <MdOutlineExpandLess className="rotate-90" />
          {/* </Link> */}
        </Button>
      </div>
    </div>
  );
}
