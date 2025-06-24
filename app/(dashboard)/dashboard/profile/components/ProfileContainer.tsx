"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function ProfileContainer() {
  const [isEditMode, setIsEditMode] = useState(false);
  const profileRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
      <div className="flex flex-col">
        <input ref={profileRef} type="file" name="" id="" className="hidden" />
        <div className="relative flex flex-col rounded-full size-28 font-bold bg-gray-200 items-center justify-center">
          A B
          <button
            onClick={() => profileRef.current?.click()}
            className="absolute -right-2.5 bottom-4 rounded-full p-1.5 border-green-600 border-2"
          >
            <FaRegPenToSquare />
          </button>
        </div>

        <form action="">
          <div className="flex flex-col mt-4">
            <label htmlFor="name" className="font-semibold text-black/80 ">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={session?.data?.user.name || ""}
              id="name"
              className="border border-gray-300 rounded p-2"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="dob" className="font-semibold text-black/80 ">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              className="border border-gray-300 rounded p-2"
            />
          </div>

          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="phone_no" className="font-semibold text-black/80 ">
              Phone Number
            </label>
            <div className="inline-flex gap-2 items-center ">
              logo
              <input
                type="tel"
                name="phone_no"
                id="phone_no"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="phone_no" className="font-semibold text-black/80 ">
              Gender
            </label>
            <div className="inline-flex gap-4 items-center">
              <span className="gap-2 inline-flex items-center">
                <input
                  type="radio"
                  id="gender"
                  className="accent-green-600"
                  name="gender"
                />
                <label htmlFor="male">Male</label>
              </span>

              <span className="gap-2 inline-flex items-center">
                <input
                  type="radio"
                  id="gender"
                  className="accent-green-600"
                  name="gender"
                />
                <label htmlFor="female">Male</label>
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="font-semibold text-black/80 ">
              Email
            </label>
            <input
              readOnly
              type="email"
              disabled
              value={session?.data?.user.email || ""}
              name="email"
              id="email"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          {/* <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button> */}
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-green-600 font-semibold inline-flex items-center gap-2"
        >
          <FaRegPenToSquare /> Change Profile Information
        </button>
        {isEditMode && (
          <button className="mt-4 border-2 border-green-500 rounded-md p-2  hover:bg-green-600 hover:border-collapse hover:text-white transition-colors">
            edit profile.
          </button>
        )}
      </div>
    </div>
  );
}
