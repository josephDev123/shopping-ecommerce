"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginInputType } from "../Types/loginInputType";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { errorAlert } from "@/lib/Alerts";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import Image from "next/image";
import { toast } from "react-toastify";
// import { Images } from "@/app/Images";

export default function Login() {
  const [togglePassword, setTogglePassword] = useState(false);
  const redirect = useRouter();
  type loginInferredType = z.infer<typeof loginInputType>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<loginInferredType>({ resolver: zodResolver(loginInputType) });
  const handleLogin: SubmitHandler<loginInferredType> = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      console.log(result);
      if (result?.ok && result.status == 200) {
        redirect.push(result.url!);
      } else {
        return errorAlert("something went wrong");
      }
    } catch (error) {
      return errorAlert("something went wrong");
    }
  };
  return (
    <section className="flex flex-col justify-center items-center h-screen w-full ">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 xl:w-[70%] w-full p-4">
        <div className="sm:flex flex-col hidden text-[#333333] p-4 ">
          <div className="inline-flex gap-2 items-center ">
            <h1 className="lg:text-4xl text-2xl font-bold">Welcome Back to</h1>
            <div className="relative  size-8">
              <Image
                src={"/png/logo.png"}
                className="bg-white rounded-full p-2 "
                alt="logo"
                fill
              />
            </div>
          </div>

          <p className="text-sm mt-6">
            Access your account and stay connected anytime, anywhere. Manage
            your activities seamlessly with our secure platform. Stay updated
            with the latest features and services. Log in now to continue your
            journey with <i className="font-bold">Shop</i>!.
          </p>
          <div className="relative block w-full h-full mt-4 drop-shadow-md">
            <Image
              src={"/jpeg/shopping_couples.png"}
              alt=""
              fill
              className="drop-shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col sm:col-span-1 col-span-full bg-white p-6 rounded-md drop-shadow-md">
          <Link
            href={"/"}
            className=" inline-flex gap-4 items-center text-2xl  text-center"
          >
            <Image src={"/png/logo.png"} alt="logo" width={60} height={60} />
            <b className="text-customgreen">Shop</b>
          </Link>
          <hr className="my-6" />
          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col ">
              <label htmlFor="email_address" className="font-semibold mb-2">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="josephuzuegbu55@gmail"
                className="border rounded-md p-2 bg-inherit outline-none border-gray-300"
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
                <span className="text-customgreen font-semibold">
                  Forgot Password?
                </span>
              </span>

              <input
                type={!togglePassword ? "password" : "text"}
                {...register("password")}
                placeholder=""
                className="border rounded-md  p-2 bg-inherit outline-none border-gray-300"
              />
              <AiOutlineEye
                className="absolute right-2 cursor-pointer top-10 text-2xl text-gray-400"
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
              className="rounded-md p-2 w-full bg-darkGreen text-white flex items-center justify-center"
            >
              <p className="w-full">Login</p>
              {isSubmitting && (
                <FaSpinner className="animate-spin h-8 w-8 ms-auto" />
              )}
            </button>
            <div className="flex justify-center text-gray-500 ">
              or signin with
            </div>

            <button
              // disabled
              // onClick={() => signIn("google")}
              onClick={(e) => {
                e.preventDefault();
                toast.error("Disabled for security reason");
              }}
              className="flex justify-center items-center gap-4 rounded-md p-2 w-full bg-gray-300 text-black/70"
            >
              <FcGoogle /> Continue with Google
            </button>

            <Link
              href="/register"
              className="flex justify-center items-center text-customgreen font-semibold p-2 w-full "
            >
              Create an account
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
