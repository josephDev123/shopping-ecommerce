import Link from "next/link";

export default function Footer() {
  return (
    <section className="flex flex-col p-16 border-2 border-t">
      <section className="grid grid-cols-4 w-full">
        <div className="flex flex-col space-y-6">
          <h2 className="font-bold text-2xl">Ecommerce</h2>
          <p className="text-gray-500 font-medium">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <h2 className="text-gray-400 font-semibold text-xl">Link</h2>
          <Link href={""} className="font-bold text-lg">
            Home
          </Link>
          <Link href={""} className="font-bold text-lg">
            Shop
          </Link>
          <Link href={""} className="font-bold text-lg">
            About
          </Link>
          <Link href={""} className="font-bold text-lg">
            Contact
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <h2 className="text-gray-400 font-semibold text-xl">Help</h2>
          <Link href={""} className="font-bold text-lg">
            Payment Options
          </Link>
          <Link href={""} className="font-bold text-lg">
            Returns
          </Link>
          <Link href={""} className="font-bold text-lg">
            Privacy Policies
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <h2 className="text-gray-400 font-semibold text-xl">Newsletter</h2>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="outline-none border-b-2 border-b-black "
            />

            <button className="border-b-2 border-b-black outline-none font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      <hr className="mt-16 w-full" />
      <p className="mt-10 font-bold">
        {" "}
        {new Date().getFullYear()} furino. All rights reverved
      </p>
    </section>
  );
}
