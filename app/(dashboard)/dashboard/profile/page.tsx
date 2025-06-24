import React from "react";
import ProfileContainer from "./components/ProfileContainer";

export default function page() {
  return (
    <section className="flex flex-col w-full h-full py-3 px-5">
      <h2 className="text-xl font-bold">Personal Information</h2>
      <ProfileContainer />
    </section>
  );
}
