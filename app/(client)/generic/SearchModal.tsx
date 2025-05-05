"use client";

import { SearchResultType } from "@/app/types/searchResultType";
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "motion/react";

interface SearchModalProps {
  closeModal: () => void;
  isOpen: boolean;
}

let timeId: NodeJS.Timeout;
export default function SearchModal({ closeModal, isOpen }: SearchModalProps) {
  const [SearchResult, setSearchResult] = useState<
    SearchResultType[] | { [key: string]: string }
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [deferredSearch, setDeferredSearch] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "data">(
    "idle"
  );

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDeferredSearch(searchValue);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [searchValue]);

  // console.log(deferredSearch);
  const handleSearch = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/api/text-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: deferredSearch }),
        }
      );
      const data = await response.json();
      const result: SearchResultType[] = data.data;
      setSearchResult(result);
      setStatus("data");
      // console.log(data);
    } catch (error) {
      // console.log(error);
      setStatus("error");
    }
  }, [deferredSearch]);
  // async function handleSearch() {
  //   try {
  //     setStatus("loading");
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASEURL}/api/text-search`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ search: deferredSearch }),
  //       }
  //     );
  //     const data = await response.json();
  //     const result: SearchResultType[] = data.data;
  //     setSearchResult(result);
  //     setStatus("data");
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     setStatus("error");
  //   }
  // }
  useEffect(() => {
    handleSearch();
  }, [deferredSearch]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 h-full w-full flex flex-col items-center justify-center bg-black/50"
        >
          <div className="bg-white flex flex-col  rounded-md sm:w-[400px] w-[90%] drop-shadow-md p-3">
            <div className="flex justify-between items-center ">
              <input
                type="search"
                className="p-2 w-full outline-none rounded-l-md"
                name=""
                id=""
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products, categories"
              />
              <button
                onClick={closeModal}
                type="button"
                className="p-1 rounded-md bg-gray-200"
              >
                ESC
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {status === "loading" && deferredSearch.length > 0 ? (
                <div className="flex flex-col justify-center items-center h-32">
                  <Loader className="" />
                </div>
              ) : status == "error" ? (
                "something went wrong"
              ) : status == "idle" ? (
                <p className="font-medium mt-2">
                  Search product and Categories
                </p>
              ) : (
                <>
                  {Array.isArray(SearchResult) && SearchResult.length > 0
                    ? SearchResult?.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col gap-2 p-2 hover:bg-gray-100"
                        >
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">
                            {item.productCategory}
                          </p>
                        </div>
                      ))
                    : "No Result Found"}
                </>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
