"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerType } from "../Types/registerType";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorAlert } from "@/lib/Alerts";
import { registerAction } from "../../serverActions/RegisterActions";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Register() {
  const [togglePassword, setTogglePassword] = useState(false);

  type RegType = z.infer<typeof registerType>;
  const redirect = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegType>({ resolver: zodResolver(registerType) });

  const handleRegister: SubmitHandler<RegType> = async (data) => {
    try {
      const result = await registerAction(data);
      if (result.status === "error") {
        errorAlert(result.msg);
      } else {
        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center my-auto h-screen w-full overflow-y-auto">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 xl:w-[70%] w-full p-4 h-[80%]">
        <div className="sm:flex flex-col hidden text-[#333333] p-4 ">
          <div className="inline-flex gap-2 items-center ">
            <h1 className="lg:text-4xl text-2xl font-bold">Join </h1>
            <div className="relative  size-8">
              <Link href={"/"}>
                <Image
                  src={"/png/logo.png"}
                  className="bg-white rounded-full p-2 "
                  alt="logo"
                  fill
                />
              </Link>
            </div>
            <p className="lg:text-4xl text-2xl font-bold">Today!</p>
          </div>

          <p className="text-sm mt-6">
            Be part of a growing community that values convenience and
            innovation. Enjoy exclusive features designed to enhance your
            experience. Manage everything effortlessly with our user-friendly
            platform. Sign up now and start exploring
            <i className="font-bold">Shop</i>!
          </p>
          <div className="relative block w-full h-full mt-4 drop-shadow-md">
            <Image
              src={"/png/design_illust_register.png"}
              alt=""
              fill
              className="drop-shadow-md"
            />
          </div>
        </div>
        <div className="flex flex-col bg-white p-6 rounded-md drop-shadow-md">
          <p className="mb-4 font-bold text-xl text-center">
            Create an account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col ">
              <label htmlFor="name" className="font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                className="border rounded-md p-2 bg-inherit outline-none border-gray-300"
                {...register("name")}
              />
              <span className="text-xs text-red-400">
                {" "}
                {errors.name && errors.name.message}
              </span>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="email_address" className="font-semibold mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="josephuzuegbu55@gmail"
                className="border rounded-md p-2 bg-inherit outline-none border-gray-300"
                {...register("email")}
              />
              <span className="text-xs text-red-400">
                {" "}
                {errors.email && errors.email.message}
              </span>
            </div>

            <div className="flex flex-col relative">
              <span className="flex justify-between mb-2">
                <label htmlFor="email_address" className="font-semibold">
                  Password
                </label>
                <span className="text-customgreen">Forgot Password?</span>
              </span>

              <input
                type={!togglePassword ? "password" : "text"}
                // placeholder=""
                className="border rounded-md p-2 bg-inherit outline-none border-gray-300"
                {...register("password")}
              />
              <AiOutlineEye
                className="absolute right-2 top-10 text-2xl text-gray-400 cursor-pointer"
                onClick={() => setTogglePassword((prev) => !prev)}
              />
              <span className="text-xs text-red-400">
                {" "}
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="accent-green-700" />
              <p>Keep me signed in</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting ? true : false}
              className="flex rounded-md p-2 w-full bg-darkGreen text-white"
            >
              <span className="mx-auto"> Sign up</span>
              {isSubmitting && (
                <FaSpinner className="animate-spin h-8 w-8 self-end" />
              )}
            </button>
            <div className="flex justify-center text-gray-500">
              or sign up with
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                toast.error("Disabled for security reason");
              }}
              className="flex justify-center items-center gap-4 rounded-md p-2 w-full bg-gray-300 text-black/70"
            >
              <FcGoogle /> Continue with Google
            </button>

            <button className="flex justify-center items-center text-customgreen font-semibold p-2 w-full ">
              Already have an account,{"  "}
              <Link className="text-black font-bold  ml-1" href={"/login"}>
                Log in
              </Link>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
