import React from "react";
import Loader from "../components/Loader";

export default function ComponentLoading() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <Loader className=" h-72" />
    </section>
  );
}
