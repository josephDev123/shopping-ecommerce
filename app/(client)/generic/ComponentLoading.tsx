import React from "react";
import Loader from "../components/Loader";

export default function ComponentLoading() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <section className="h-80 w-full flex flex-col justify-center items-center">
        {/* <AiOutlineLoading3Quarters className={`animate-spin ${className}`} /> */}
        <Loader className=" h-52" />
      </section>
    </section>
  );
}
