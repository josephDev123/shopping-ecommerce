"use client";

import Image from "next/image";
import { Images } from "./Images";

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
      <h2>Something went wrong!</h2>
      <button
        className="p-1 rounded-md bg-red-300 text-white"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
