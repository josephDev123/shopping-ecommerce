"use client";

import Image from "next/image";
import { Images } from "./Images";
import { Suspense } from "react";
import CategoryBodyWrapper from "./(client)/category/component/CategoryBodyWrapper";
import Loader from "./(client)/components/Loader";
import Banner from "./(client)/generic/Banner";
import { CustomFetch } from "./serverActions/customFetch";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* <Image src={Images.pawPawErrorImg} alt="error" className="size-80" /> */}
      <h2 className="text-center mb-2">
        Something went wrong! <br />{" "}
        <span className="text-sm">Check Network or Click Try again</span>
      </h2>
      <button
        className="p-1 rounded-md bg-red-300 text-white"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
