import Link from "next/link";

export default function Footer() {
  return (
    <section className="flex flex-col min-[425px]:p-16 p-4 border-2 border-t">
      <section className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        <div className="flex flex-col space-y-6">
          <h2 className="font-bold text-2xl">Shopping</h2>
          <p className="text-sm text-black/60 font-medium">
            Abeokuta, Eleweran, <br />
            Ogun state, Nigeria
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <h2 className="font-bold text-xl">Link</h2>
          <Link href={"/"} className="font-bold text-sm text-black/60">
            Home
          </Link>
          <Link href={"/shop"} className="font-bold text-sm text-black/60">
            Shop
          </Link>
          <Link href={"/about"} className="font-bold text-sm text-black/60">
            About
          </Link>
          <Link href={"/contact"} className="font-bold text-sm text-black/60">
            Contact
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <h2 className=" font-bold text-xl">Help</h2>
          <Link
            href={"#"}
            className="font-bold text-sm text-black/60 cursor-not-allowed"
          >
            Payment Options
          </Link>
          {/* <Link href={""} className="font-bold text-lg">
            Returns
          </Link> */}
          <Link
            href={"#"}
            className="font-bold text-sm text-black/60 cursor-not-allowed"
          >
            Privacy Policies
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <h2 className="font-bold text-xl">Newsletter</h2>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="outline-none border-b-2 border-b-black "
            />

            <button className="border-b-2 border-b-black text-sm text-black/60 outline-none font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      <hr className="mt-16 w-full text-sm" />
      <p className="mt-10 font-bold">
        {new Date().getFullYear()}. All rights reserved
      </p>
    </section>
  );
}
